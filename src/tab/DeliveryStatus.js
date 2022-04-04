export const DeliveryStatus = {
  // 식당이 바꿀 수 있는 상태
  WAITING: 'WAITING',
  REJECTED: 'REJECTED',
  PREPARING: 'PREPARING',
  READY_TO_PICK_UP: 'READY_TO_PICK_UP',

  // 배달원이 바꿀 수 있는 상태
  IN_DELIVERY: 'IN_DELIVERY',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
}