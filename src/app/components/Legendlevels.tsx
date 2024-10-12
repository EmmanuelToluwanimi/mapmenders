const Legendlevels = () => {
  return (
    <div className="absolute bottom-0 left-0 m-4 p-4 bg-white shadow-lg rounded-md">
      <h3 className="font-bold mb-2">Health Center Density</h3>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#800026]"></span> 150+
        Centers
      </div>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#BD0026]"></span> 100 -
        150 Centers
      </div>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#E31A1C]"></span> 50 -
        100 Centers
      </div>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#FC4E2A]"></span> 20 - 50
        Centers
      </div>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#FD8D3C]"></span> 10 - 20
        Centers
      </div>
      <div>
        <span className="inline-block w-4 h-4 mr-2 bg-[#FFEDA0]"></span> 0 - 10
        Centers
      </div>
    </div>
  );
};

export default Legendlevels;
