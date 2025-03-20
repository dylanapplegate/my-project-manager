import { Chat, LMStudioClient } from '@lmstudio/sdk'

const lmStudioClient = new LMStudioClient()

export async function getTaskSuggestion(taskHistory: string, pendingTasks: string) {
  try {
    const chat = Chat.from([
      {
        role: 'system',
        content: `You are an intelligent task manager. Your goal is to help the user decide the next most important task to work on based on past work and pending tasks.
        Prioritize tasks based on:
        - Deadlines and urgency
        - Unfinished or dependent tasks
        - High-priority or high-impact tasks
        - The user's typical productivity patterns.

        If a task is overdue, suggest working on it first.
        If there are no urgent tasks, recommend tasks that provide long-term benefits.
        Provide a single **clear** recommendation, not generic advice.`,
      },
      {
        role: 'user',
        content: `You are my personal productivity assistant. Your goal is to suggest the most impactful task I should work on next based on urgency, priority, and dependencies.

### Completed Tasks:
${taskHistory}

### Pending Tasks:
${pendingTasks}

### Instructions:
- Prioritize tasks based on urgency, deadlines, and dependencies.
- If a task is overdue, suggest it only if it is **the highest priority**.
- If no urgent tasks exist, suggest **the most valuable task** for long-term goals.
- Consider **task category balance** to avoid over-focusing on one area.
- If two tasks are equally important, suggest the one that requires less time.

**Provide one specific recommendation** in this format:

**Next Task:** [Task Name]
**Reasoning:** [Why this task is the best choice right now]`,
      },
    ])

    const model = await lmStudioClient.llm.model('gemma-3-4b-it') // Updated to a better model
    const response = await model.respond(chat)

    return response.content || 'No suggestion available.'
  } catch (error) {
    console.error('Error fetching suggestion from LM Studio:', error)
    return 'Error fetching AI suggestion.'
  }
}
