import { Comment } from "./Comment";
export interface Thread {
    thread_id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    comments: Comment[];
};