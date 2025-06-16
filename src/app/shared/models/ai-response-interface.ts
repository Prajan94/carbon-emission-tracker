export interface AiResponse {
    choices: {
      message: {
        content: string;
      };
    }[];
  }