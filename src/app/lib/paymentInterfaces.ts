export interface PaymentMethod {
  id: string;
  name: string;
  img_url: string;
}
export interface Country {
  code: string;
  name: string;
}
export interface Info {
  type: number; // 0 - infomation, 1 - warning, 2 - error
  message: string;
}
