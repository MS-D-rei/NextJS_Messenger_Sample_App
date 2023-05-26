function EmptyState() {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      h-full
      bg-gray-100
      px-4
      py-10
      sm:px-6
      ls:px-8
      "
    >
      <div className="flex flex-col text-center items-center">
        <h3
          className="
          text-2xl
          font-semibold
          text-gray-900
          mt-2
          "
        >
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
}

export default EmptyState;
