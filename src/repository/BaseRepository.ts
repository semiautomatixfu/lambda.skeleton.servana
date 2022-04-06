export class BaseRepository {
  protected async getAllPages<T>(
    get: (page: number) => Promise<{ last: boolean; content: T[] }>,
  ): Promise<T[]> {
    const result: T[] = [];
    let page = 0;
    let hasNextPage = true;
    while (hasNextPage) {
      const { content, last } = await get(page++);
      result.push(...content);
      hasNextPage = !last;
    }
    return result;
  }
}
