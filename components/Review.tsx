import Rating from "./Rating";

type type = { name: string };
function Review({ name }: type) {
  return (
    <div className="review flex flex-col items-center">
      <Rating rating={4} canAdd={false} add="" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque
        ut sapien, posuere non. Faucibus egestas consectetur interdum amet id
        elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl,
        vitae nisl.
      </p>
      <h4>
        <span></span>
        {name}
      </h4>
    </div>
  );
}

export default Review;
