
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