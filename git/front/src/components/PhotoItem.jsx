export default function PhotoItem(props) {
  return (
    <img
      src={props.url}
      onError={this.addDefaultSrc}
      alt="photoItem"
      style={{
        width: "500px",
        height: "600px",
        border: "1px solid #123C69",
      }}
    ></img>
  );
}
