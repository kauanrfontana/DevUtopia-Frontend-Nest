export class Review {
  constructor(
    public id: number = 0,
    public stars: number = 0,
    public review: string = "",
    public userName: string = "",
    public productId: number = 0,
    public userId: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
