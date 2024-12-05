const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div className="font-main text-2xl font-bold self-start mt-2">
      Filter starting with{" "}
      <input value={filter} onChange={handleFilterChange} className="rounded-lg pl-1 font-normal border border-black" />
    </div>
  );
};

export default Filter;
