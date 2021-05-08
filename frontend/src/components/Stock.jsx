function Stock(props) {
  const stock = props.stock;

  return (
    <div>
      <div>{stock.name}</div>

      <div>Symbol:{stock.symbol}</div>
      <div>Price:${stock.price}</div>
    </div>
  );
}
export default Stock;
