export interface AuthResponse{
  access_token: string;
  // status?: number;
  // message?: string;
}

export interface ErrorResponse{
  status: number;
  message: string;
}
