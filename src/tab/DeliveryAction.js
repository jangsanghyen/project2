import { DeliveryStatus } from './DeliveryStatus';

function DeliveryAction({ status, handleInDelivery, handleReadyToPickUp, handleCompleted, handleFailed }) {
  if(status === DeliveryStatus.READY_TO_PICK_UP) {
    return <>
      <button className="btn-primary" onClick={handleInDelivery}>픽업 완료</button>
      <button onClick={handleReadyToPickUp}>수락 취소</button>
    </>
  }
  else if(status === DeliveryStatus.IN_DELIVERY) {
    return <>
      <button className="btn-primary" onClick={handleCompleted}>배달 완료</button>
      <button onClick={handleFailed}>실패</button>
    </>
  }
  else {
    return ''
  }

}

export default DeliveryAction;