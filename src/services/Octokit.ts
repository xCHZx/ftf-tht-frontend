
import { Octokit } from "octokit";


const owner = "xCHZx";
const repo = "ftf-tht-frontend";

const octokit = new Octokit({
    auth: import.meta.env.VITE_OCTOKIT_TOKEN
})

export const getCommits = async () => {
    const result = await octokit.request(`GET /repos/${owner}/${repo}/commits`);
    // console.log(result.data);
    return result.data;
}

export const getSingleCommit = async (sha: String) => {
    const result = await octokit.request(`GET /repos/${owner}/${repo}/commits/${sha}`);
    console.log(result.data);
    return result.data;
}