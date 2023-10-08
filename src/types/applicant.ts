export interface Applicant {
  id: number;
  user: {
    id: number;
    name: string;
    profileImage: string;
    rating: number;
  };
  status: boolean;
}
