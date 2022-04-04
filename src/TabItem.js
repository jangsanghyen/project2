function TabItem({ title, children, visible }) {
  return <div className={visible ? 'tab' : 'tab hidden'}>
    <header>
      <h3>{title}</h3>
    </header>
    {children}
  </div>
}

export default TabItem;