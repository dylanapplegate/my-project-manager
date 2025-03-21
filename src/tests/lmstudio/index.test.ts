import { LMStudioClient, Chat } from '@lmstudio/sdk'
import { getTaskSuggestion } from '../../lmstudio'

jest.mock('@lmstudio/sdk')

describe('getTaskSuggestion', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a suggestion based on task history and pending tasks', async () => {
    const taskHistory = 'Task 1 completed\nTask 2 completed'
    const pendingTasks = 'Task 3 pending\nTask 4 pending'
    const aiSuggestion = 'Next Task: Task 3\nReasoning: Task 3 is the highest priority.'

    const chatMock = jest.mocked(Chat)
    const LMSStudioClientMock = jest.mocked(LMStudioClient)
    LMSStudioClientMock.mockImplementation(() => {
      return {
        clientIdentifier: '',
        embedding: {},
        system: {},
        diagnostics: {},
        file: {},
        audio: {},
        vision: {},
        llm: {
          model: jest.fn().mockReturnValue({
            respond: jest.fn().mockResolvedValue({ content: aiSuggestion }),
          }),
        },
      } as unknown as LMStudioClient
    })

    const result = await getTaskSuggestion(taskHistory, pendingTasks)
    expect(result).toBe(aiSuggestion)

    // expect(mockRespond).toHaveBeenCalledWith(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       role: 'system',
    //       content: expect.stringContaining('You are an intelligent task manager'),
    //     }),
    //     expect.objectContaining({
    //       role: 'user',
    //       content: expect.stringContaining('### Completed Tasks:'),
    //     }),
    //   ]),
    // )

    // expect(result).toBe(aiSuggestion)
  })

  // it('should return a default message if no suggestion is available', async () => {
  //   const taskHistory = 'Task 1 completed\nTask 2 completed'
  //   const pendingTasks = 'Task 3 pending\nTask 4 pending'

  //   mockRespond.mockResolvedValueOnce({ content: '' })

  //   const result = await getTaskSuggestion(taskHistory, pendingTasks)

  //   expect(result).toBe('No suggestion available.')
  // })

  // it('should handle errors gracefully', async () => {
  //   const taskHistory = 'Task 1 completed\nTask 2 completed'
  //   const pendingTasks = 'Task 3 pending\nTask 4 pending'

  //   mockRespond.mockRejectedValueOnce(new Error('API error'))

  //   const result = await getTaskSuggestion(taskHistory, pendingTasks)

  //   expect(result).toBe('Error fetching AI suggestion.')
  // })

  // it('should handle no pending tasks gracefully', async () => {
  //   const taskHistory = 'Task 1 completed\nTask 2 completed'
  //   const pendingTasks = ''

  //   mockRespond.mockResolvedValueOnce({ content: 'Next Task: None\nReasoning: No pending tasks.' })

  //   const result = await getTaskSuggestion(taskHistory, pendingTasks)

  //   expect(result).toBe('Next Task: None\nReasoning: No pending tasks.')
  // })
})
