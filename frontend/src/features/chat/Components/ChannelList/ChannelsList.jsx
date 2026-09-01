import 'bootstrap/dist/css/bootstrap.min.css'

export default ChannelsList = () => {
    return (
        <div classList="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <a href="/" classList="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span classList="fs-4">Каналы</span>
            </a>
            <ul classList="nav nav-pills flex-column mb-auto">
                { channels.map(c => {
                    return <ChannelIem key={c.id} name={c.name} id={c.id}/>
                })}
            </ul>
  </div>
    )
}