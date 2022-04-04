import DeliveryAction from './DeliveryAction';
import { DeliveryStatus } from './DeliveryStatus';
import useSWR, { useSWRConfig } from "swr"

const fetcher = () => fetch(`${process.env.REACT_APP_ENDPOINT}/api/deliveries`).then(res => res.json())

function InDelivery() {
  const { data: deliveries, error } = useSWR('get/deliveries', fetcher)
  const { mutate } = useSWRConfig()

  if (!deliveries) return <div>로딩 중</div>
  if (error || deliveries.error) return <div>요청을 받아올 수 없습니다. 서버 문제같은데요?</div>

  const currentDelivery = deliveries.find(d => d.status === DeliveryStatus.IN_DELIVERY)

  const handleStatusChange = (status) => {
    mutate('get/deliveries', async (deliveries) => {
      const id = currentDelivery._id;
      const updatedDelivery = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/deliveries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())

      const filteredDeliveries = deliveries.filter(d => d._id !== id)
      return [...filteredDeliveries, updatedDelivery]
    })
  }

  return <div className="page">
    {currentDelivery ?
      <div>
        <div>
          <h2>출발지</h2>
          <div>
            {currentDelivery.source.name}<br/>
            {currentDelivery.source.address}
          </div>
        </div>
        <div>
          <h2>목적지</h2>
          <div>
            {currentDelivery.destination.address}
          </div>
        </div>
        <div className="action-btns" style={{marginTop: '2rem'}}>
          <DeliveryAction status={currentDelivery.status}
            handleCompleted={() => handleStatusChange(DeliveryStatus.COMPLETED)}
            handleFailed={() => handleStatusChange(DeliveryStatus.FAILED)}
          />
        </div>
      </div>
    : '배달을 시작하려면 "배달 요청" 탭에서 요청을 수락하세요'}
  </div>
}

export default InDelivery;