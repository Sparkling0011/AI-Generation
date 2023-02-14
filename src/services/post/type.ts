export interface postResponse {
  success: boolean;
  data: Array<postType>;
}

export interface postType {
  name: string;
  prompt: string;
  photo: string;
}
