type type = { rating: number; add: any; canAdd: boolean };
function Rating({ rating, add, canAdd }: type) {
  return (
    <div className="rating flex">
      {rating > 0 ? (
        <img src="/images/star1.png" onClick={() => (canAdd ? add(1) : "")} />
      ) : (
        <></>
      )}
      {rating > 1 ? (
        <img src="/images/star1.png" onClick={() => (canAdd ? add(2) : "")} />
      ) : (
        <></>
      )}
      {rating > 2 ? (
        <img src="/images/star1.png" onClick={() => (canAdd ? add(3) : "")} />
      ) : (
        <></>
      )}
      {rating > 3 ? (
        <img src="/images/star1.png" onClick={() => (canAdd ? add(4) : "")} />
      ) : (
        <></>
      )}
      {rating > 4 ? (
        <img src="/images/star1.png" onClick={() => (canAdd ? add(5) : "")} />
      ) : (
        <></>
      )}
      {rating < 1 ? (
        <img src="/images/star.png" onClick={() => (canAdd ? add(1) : "")} />
      ) : (
        <></>
      )}
      {rating < 2 ? (
        <img src="/images/star.png" onClick={() => (canAdd ? add(2) : "")} />
      ) : (
        <></>
      )}
      {rating < 3 ? (
        <img src="/images/star.png" onClick={() => (canAdd ? add(3) : "")} />
      ) : (
        <></>
      )}
      {rating < 4 ? (
        <img src="/images/star.png" onClick={() => (canAdd ? add(4) : "")} />
      ) : (
        <></>
      )}
      {rating < 5 ? (
        <img src="/images/star.png" onClick={() => (canAdd ? add(5) : "")} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Rating;
