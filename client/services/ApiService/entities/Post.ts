import { PageOptionsDto } from '@/types';
import { Base } from '.';

export class Post extends Base {
  async getPopular(pageOptionsDto: PageOptionsDto, period?: string) {
    const { data } = await this.apiClient.instance.get(`/posts/popular`, {
      params: { ...pageOptionsDto, period },
    });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async like(id: number) {
    await this.apiClient.instance.post('/likes', { postId: id });
  }

  async dislike(id: number) {
    await this.apiClient.instance.post('/dislikes', { postId: id });
  }

  async subscribe(category: string) {
    await this.apiClient.instance.post('/subs', { category });
  }

  async save(id: number) {
    await this.apiClient.instance.post('/saved', { postId: id });
  }

  // async post(data) {
  //   await this.apiClient.instance.post(`/posts`, data);
  // }

  // async getAll() {
  //   const data = shortPosts;

  //   return data;
  // }

  // async getOne(id: number) {
  //   return post;
  // }
}
