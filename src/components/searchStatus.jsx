const SearchStatus = ({ length }) => {
  let addRenderClass = length === 0 ? "danger" : "primary";

  const renderPhrase = (number) => {
    const arr = [
      "человека тусанут",
      "человек тусанёт",
      "человек тусанут",
      "Никто с тобой не тусанёт",
    ];
    //   if (number === 0) {
    //     return `${arr[3]}`;
    //   }
    //   if (number % 10 === 0 || (number > 10 && number <= 19)) {
    //     return `${number} ${arr[2]} с тобой сегодня`;
    //   } else if (
    //     (number >= 2 && number <= 4) ||
    //     (number % 10 >= 2 && number % 10 <= 4)
    //   ) {
    //     return `${number} ${arr[0]} с тобой сегодня`;
    //   } else if (
    //     (number >= 5 && number <= 9) ||
    //     (number % 10 >= 5 && number % 10 <= 9) ||
    //     number % 10 === 1
    //   ) {
    //     return `${number} ${arr[1]} с тобой сегодня`;
    //   }
    // };

    let substrIndex = 0;

    if (number === 0) {
      substrIndex = 3;
      return `${arr[substrIndex]}`;
    }
    if (number % 10 === 0 || (number > 10 && number <= 19)) {
      substrIndex = 2;
      return `${number} ${arr[substrIndex]} с тобой сегодня`;
    } else if (
      (number >= 2 && number <= 4) ||
      (number % 10 >= 2 && number % 10 <= 4)
    ) {
      substrIndex = 0;
      return `${number} ${arr[substrIndex]} с тобой сегодня`;
    } else if (
      (number >= 5 && number <= 9) ||
      (number % 10 >= 5 && number % 10 <= 9) ||
      number % 10 === 1
    ) {
      substrIndex = 1;
      return `${number} ${arr[substrIndex]} с тобой сегодня`;
    }
  };

  return (
    <h2>
      <span className={`badge bg-${addRenderClass}`}>{`${renderPhrase(
        length
      )}`}</span>
    </h2>
  );
};

export default SearchStatus;
