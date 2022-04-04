import useSWR, { useSWRConfig } from "swr"

const fetcher = () => fetch(`${process.env.REACT_APP_ENDPOINT}/api/deliveries`).then(res => res.json())

function DeliveryRequest() {
  const { data, error } = useSWR('get/deliveries', fetcher)
  const { mutate } = useSWRConfig()

  if (!data) return <div>로딩 중</div>
  if (error || data.error) return <div>요청을 받아올 수 없습니다. 서버 문제같은데요?</div>

  const handleAcceptance = (id) => {
    mutate('get/deliveries', async (deliveries) => {
      const updatedDelivery = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/deliveries/${id}/acceptance`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())

      const filteredDeliveries = deliveries.filter(d => d._id !== id)
      return [...filteredDeliveries, updatedDelivery]
    })
  }


  return <div className="list-view">
    <ul>
      <li className='list-item list-header'>
        <div className='col-id'>ID</div>
        <div>출발지</div>
        <div>목적지</div>
        <div></div>
      </li>
      {data.map(delivery => <li className='list-item' key={delivery._id}>
        <div className='col-id'>{delivery._id.substring(0,4)}</div>
        <div>
          {delivery.source.name}<br/>
          {delivery.source.address}
        </div>
        <div>{delivery.destination.address}</div>
        <div className="action-btns">
          <button className="btn-primary" onClick={() => handleAcceptance(delivery._id)}>수락</button>
        </div>
      </li>)}
    </ul>
  </div>
}

export default DeliveryRequest