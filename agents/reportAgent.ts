export function generateSummary(
    decision: string,
    score: number,
    risk: string
) {
    if (decision === "BUY") {
        return `This company appears to be a strong long-term investment with manageable risk and attractive growth potential. (Score: ${score}, Risk: ${risk})`;
    }

    if (decision === "HOLD") {
        return `The company has stable fundamentals but investors should monitor future performance before investing. (Score: ${score}, Risk: ${risk})`;
    }

    return `The current risks outweigh potential returns. Investors should avoid new positions until fundamentals improve. (Score: ${score}, Risk: ${risk})`;
}