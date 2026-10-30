export default interface Tester {
  username: string;
  createdAt: Date;
  avatar: {
    public_id: string;
    url: string;
  };
}
