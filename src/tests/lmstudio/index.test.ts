import { LMStudioClient, Chat } from '@lmstudio/sdk'
import { getTaskSuggestion } from '../../lmstudio'

jest.mock('@lmstudio/sdk')

describe('getTaskSuggestion', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a suggestion based on task history and pending tasks', async () => {
    const taskHistory = 'Task 1 completed\nTask 2 completed'
    const pendingTasks = 'Task 3 pending\nTask 4 pending'
    const aiSuggestion = 'Next Task: Task 3\nReasoning: Task 3 is the highest priority.'

    const chatMock = jest.mocked(Chat)
    chatMock.from.mockReturnValue({
      appendText: jest.fn(),
    } as unknown as Chat)

    const LMSStudioClientMock = jest.mocked(LMStudioClient)
    LMSStudioClientMock.mockImplementation(
      () =>
        ({
          llm: {
            model: jest.fn().mockResolvedValue({
              respond: jest.fn().mockResolvedValue({ content: aiSuggestion }),
            }),
          },
        }) as any,
    )

    const getTaskSuggestion = require('../../lmstudio').getTaskSuggestion

    // const mockRespond = jest.fn().mockResolvedValue({ content: aiSuggestion })

    const result = await getTaskSuggestion(taskHistory, pendingTasks)
    expect(result).toBe(aiSuggestion)
  })

  it('should return a default message if no suggestion is available', async () => {
    const taskHistory = 'Task 1 completed\nTask 2 completed'
    const pendingTasks = 'Task 3 pending\nTask 4 pending'

    const chatMock = jest.mocked(Chat)
    chatMock.from.mockReturnValue({
      appendText: jest.fn(),
    } as unknown as Chat)

    const LMSStudioClientMock = jest.mocked(LMStudioClient)
    LMSStudioClientMock.mockImplementation(
      () =>
        ({
          llm: {
            model: jest.fn().mockResolvedValue({
              respond: jest.fn().mockResolvedValue({}),
            }),
          },
        }) as any,
    )

    const getTaskSuggestion = require('../../lmstudio').getTaskSuggestion

    const result = await getTaskSuggestion(taskHistory, pendingTasks)

    expect(result).toBe('No suggestion available.')
  })

  it('should handle errors gracefully', async () => {
    const taskHistory = 'Task 1 completed\nTask 2 completed'
    const pendingTasks = 'Task 3 pending\nTask 4 pending'

    const chatMock = jest.mocked(Chat)
    chatMock.from.mockReturnValue({
      appendText: jest.fn(),
    } as unknown as Chat)

    const LMSStudioClientMock = jest.mocked(LMStudioClient)
    LMSStudioClientMock.mockImplementation(
      () =>
        ({
          llm: {
            model: jest.fn().mockResolvedValue({
              respond: jest.fn().mockImplementation(() => {
                throw new Error('Error fetching AI suggestion.')
              }),
            }),
          },
        }) as any,
    )

    const result = await getTaskSuggestion(taskHistory, pendingTasks)

    expect(result).toBe('Error fetching AI suggestion.')
  })

  it('should handle no pending tasks gracefully', async () => {
    const taskHistory = 'Task 1 completed\nTask 2 completed'
    const pendingTasks = ''
    const aiSuggestion = 'Next Task: None\nReasoning: No pending tasks.'

    const chatMock = jest.mocked(Chat)
    chatMock.from.mockReturnValue({
      appendText: jest.fn(),
    } as unknown as Chat)

    const LMSStudioClientMock = jest.mocked(LMStudioClient)
    LMSStudioClientMock.mockImplementation(
      () =>
        ({
          llm: {
            model: jest.fn().mockResolvedValue({
              respond: jest.fn().mockResolvedValue({ content: aiSuggestion }),
            }),
          },
        }) as any,
    )

    const result = await getTaskSuggestion(taskHistory, pendingTasks)

    expect(result).toBe('Next Task: None\nReasoning: No pending tasks.')
  })
})
