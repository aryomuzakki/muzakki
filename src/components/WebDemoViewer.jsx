
const WebDemoViewer = ({ src }) => {
  return (
    <div>
      {
        src ? (
          <iframe src={src} width="100%" height="100%"></iframe>
        ) : (
          <div>
            <p>no link provided</p>
          </div>
        )
      }
    </div>
  )
}

export default WebDemoViewer