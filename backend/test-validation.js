const http = require('http');
const app = require('./index');

async function runTests() {
    const server = app.listen(0);
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}`;

    async function request(path, options = {}) {
        const url = `${baseUrl}${path}`;
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            ...options
        });
        const data = await res.json().catch(() => null);
        return { status: res.status, data };
    }

    console.log("Running validation tests on port", port);
    let passed = 0;
    let total = 0;

    function assert(testName, condition, details = "") {
        total++;
        if (condition) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${testName} - ${details}`);
        }
    }

    // 1. Auth Signup Invalid (empty username)
    const badSignup = await request('/signup', {
        method: 'POST',
        body: JSON.stringify({ username: "", password: "123" })
    });
    assert("Signup validation fails with empty username", badSignup.status === 400 && badSignup.data.errors.length > 0, JSON.stringify(badSignup.data));

    // 2. Auth Signup Valid
    const goodSignup = await request('/signup', {
        method: 'POST',
        body: JSON.stringify({ username: "zoduser", password: "password123", name: "Zod User" })
    });
    assert("Signup validation passes with valid input", goodSignup.status === 201, JSON.stringify(goodSignup.data));

    // 3. Auth Signin Valid
    const goodSignin = await request('/signin', {
        method: 'POST',
        body: JSON.stringify({ username: "zoduser", password: "password123" })
    });
    assert("Signin validation passes with correct credentials", goodSignin.status === 200 && !!goodSignin.data.token, JSON.stringify(goodSignin.data));

    // 4. Create Org Invalid (missing title)
    const badOrg = await request('/organization', {
        method: 'POST',
        body: JSON.stringify({ dec: "No title provided" })
    });
    assert("Create org fails without title", badOrg.status === 400 && badOrg.data.errors.length > 0, JSON.stringify(badOrg.data));

    // 5. Create Org Valid
    const goodOrg = await request('/organization', {
        method: 'POST',
        body: JSON.stringify({ title: "Zod Tech Corp", dec: "Validated org" })
    });
    assert("Create org passes with title", goodOrg.status === 201 && goodOrg.data.organization.title === "Zod Tech Corp", JSON.stringify(goodOrg.data));
    const newOrgId = goodOrg.data.organization.id;

    // 6. Create Board Invalid (missing orgId)
    const badBoard = await request('/boards', {
        method: 'POST',
        body: JSON.stringify({ title: "Board without Org" })
    });
    assert("Create board fails without orgId", badBoard.status === 400, JSON.stringify(badBoard.data));

    // 7. Create Board Valid
    const goodBoard = await request('/boards', {
        method: 'POST',
        body: JSON.stringify({ title: "Sprint 1", orgId: newOrgId })
    });
    assert("Create board passes with title and orgId", goodBoard.status === 201 && goodBoard.data.board.title === "Sprint 1", JSON.stringify(goodBoard.data));
    const newBoardId = goodBoard.data.board.id;

    // 8. Board by ID Invalid (non-numeric id param)
    const badBoardId = await request('/boards/abc', { method: 'GET' });
    assert("Get board by invalid ID returns 400", badBoardId.status === 400, JSON.stringify(badBoardId.data));

    // 9. Board by ID Valid
    const goodBoardId = await request(`/boards/${newBoardId}`, { method: 'GET' });
    assert("Get board by valid numeric ID succeeds", goodBoardId.status === 200 && goodBoardId.data.board.id === newBoardId, JSON.stringify(goodBoardId.data));

    // 10. Create Issue Invalid (missing board)
    const badIssue = await request('/issue', {
        method: 'POST',
        body: JSON.stringify({ title: "Issue missing board" })
    });
    assert("Create issue fails without board", badIssue.status === 400, JSON.stringify(badIssue.data));

    // 11. Create Issue Valid
    const goodIssue = await request('/issue', {
        method: 'POST',
        body: JSON.stringify({ title: "Write tests", description: "Validate with Zod", board: newBoardId, status: "todo" })
    });
    assert("Create issue passes with valid data", goodIssue.status === 201 && goodIssue.data.issue.title === "Write tests", JSON.stringify(goodIssue.data));
    const newIssueId = goodIssue.data.issue.id;

    // 12. Update Issue Valid
    const updateRes = await request(`/issues/${newIssueId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: "inProcess" })
    });
    assert("Update issue succeeds", updateRes.status === 200 && updateRes.data.issue.status === "inProcess", JSON.stringify(updateRes.data));

    // 13. Delete Issue Valid
    const deleteRes = await request(`/issues/${newIssueId}`, {
        method: 'DELETE'
    });
    assert("Delete issue succeeds", deleteRes.status === 200, JSON.stringify(deleteRes.data));

    console.log(`\nResults: ${passed}/${total} tests passed.`);
    server.close();
    process.exit(passed === total ? 0 : 1);
}

runTests().catch(err => {
    console.error("Test runner error:", err);
    process.exit(1);
});
