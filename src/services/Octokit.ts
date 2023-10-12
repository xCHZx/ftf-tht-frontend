
import { Octokit } from "octokit";

const owner = "xCHZx";
const repo = "ftf-tht-frontend";

const octokit = new Octokit({
    auth: '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',
});

export const getCommits = async () => {
    const result = await octokit.request(`GET /repos/${owner}/${repo}/commits`);
    console.log(result.data);
    return result.data;
}
