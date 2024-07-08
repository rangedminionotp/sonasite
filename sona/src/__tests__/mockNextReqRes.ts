import { NextApiRequest, NextApiResponse } from "next";

// Mock NextRequest
export const mockNextRequest = (
  opt?: Partial<NextApiRequest>
): NextApiRequest =>
  ({
    ...opt,
  } as NextApiRequest);

// Mock NextResponse
export const mockNextResponse = () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    // Add more methods as needed
  };
  return res as NextApiResponse;
};
