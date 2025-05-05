// import { useState, useEffect } from "react";
// import hikdata from "../assets/data.json";

// const googleKey = import.meta.env.VITE_REACT_APP_GOOGLE_KEY || "";
// const googleProjID = import.meta.env.VITE_REACT_APP_GOOGLE_PROJ_ID || "";
// const hikData = hikdata.HIK;

// const SearchBar = () => {
  // const [products, setProducts] = useState<{ id: number; title: string; thumbnail: string; price: number }[]>([]);
//   const [searchText, setSearchText] = useState("");
  // const [apiResults, setApiResults] = useState<{ id: number; title: string; thumbnail: string; price: number }[]>([]);
  // const [hikResults, setHikResults] = useState<{ name: string; description: string; price: number }[]>([]);
  // const [googleResults, setGoogleResults] = useState<{ 
  //   pagemap?: { cse_image?: { src: string }[] }; 
  //   link: string; 
  //   title: string; 
  //   snippet: string; 
  // }[]>([]);

//   useEffect(() => {
//     fetch("https://dummyjson.com/products/category/smartphones")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.products || []))
//       .catch((err) => console.error("API fetch error:", err));
//   }, []);

//   useEffect(() => {
//     if (searchText.trim() === "") {
//       setApiResults([]);
//       setHikResults([]);
//       setGoogleResults([]);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       const apiFiltered = products.filter((product) =>
//         product.title.toLowerCase().includes(searchText.toLowerCase())
//       );
//       setApiResults(apiFiltered);

//       if (apiFiltered.length === 0) {
//         const hikFiltered = hikData.filter((item) =>
//           item.name.toLowerCase().includes(searchText.toLowerCase())
//         );
//         setHikResults(
//           hikFiltered.map((item) => ({
//             name: item.name,
//             description: item.description,
//             price: parseFloat(item.price),
//           }))
//         );

//         if (hikFiltered.length === 0) {
//           const params = new URLSearchParams({
//             key: googleKey,
//             cx: googleProjID,
//             q: searchText,
//           });

//           fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`)
//             .then((res) => res.json())
//             .then((data) => setGoogleResults(data.items || []))
//             .catch((err) => console.error("Google Search Error:", err));
//         } else {
//           setGoogleResults([]);
//         }
//       } else {
//         setHikResults([]);
//         setGoogleResults([]);
//       }
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [searchText, products]);

//   const [items, setItems] = useState<{ title: string; imageUrl: string; link: string; desc: string }[]>([]);
// const [added,setAdded] = useState<boolean>(false)
//     const addToDb = () => {
//       setAdded(true)
//       const newItems = googleResults.map((item,idx) => {
//         return {
//           id:idx,
//           title: item.title,
//           imageUrl: item.pagemap?.cse_image?.[0]?.src || '',
//           link: item.link,
//           desc: item.snippet,
//         };
//       });
//       setItems(newItems);
//     };
//     useEffect(() => {
//       localStorage.setItem('items', JSON.stringify(items));
//     }, [items]);
  
//     console.log(JSON.parse(localStorage.getItem('items') || '[]'));
//   return (
//     <>
//     <div className="flex flex-col justify-center items-center">
//     <h2>Search Products</h2>
//         <input
//           type="search"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           placeholder="Search..."
//           style={{
//             marginTop: "20px",
//             padding: "10px",
//             fontSize: "16px",
//             borderRadius: "4px",
//             border: "1px solid #aaa",
//           }}
//         />
//     </div>
        
//     <div style={{ display: "flex", height: "85vh", width: "100%" }}>
//  {/* Sidebar with Search */}
//  <div
//         style={{
//             width:'30%',
//           padding: "30px",
//           borderRight: "1px solid #ccc",
//           display: "flex",flexDirection:'column'
//         }}
//       >
//            {/* Section 1: API Results */}
//       <div style={{ overflowY: "auto" }}>
//         <h3>CP Data  Results</h3>      {apiResults.length > 0 ? (
//           apiResults.map((product) => (
//             <div key={product.id} style={{ marginBottom: "15px" }}>
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 style={{ width: "100%", height: "100px", objectFit: "contain" }}
//               />
//               <h4>{product.title}</h4>
//               <p>${product.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//       </div>

//       {/* Section 2: hikData Results */}
//       <div style={{ width: "35%", padding: "20px", overflowY: "auto" ,borderRight: "1px solid #ccc",}}>
//         <h3>Public Data Results</h3>
//         {hikResults.length > 0 ? (
//           hikResults.map((item, index) => (
//             <div key={index} style={{ marginBottom: "15px" }}>
//               <h4>{item.name}</h4>
//               <p>{item.description}</p>
//               <p>{item.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>

//       {/* Section 3: Google Results */}
//       <div style={{ width: "35%", padding: "20px", overflowY: "auto" }}>
//         <h3>Google Results</h3>
//         {googleResults.length > 0 ? (
//           googleResults.map((item, idx) => {
//             const imageUrl = item.pagemap?.cse_image?.[0]?.src|| '';
//             return (
//               <div key={idx} style={{ marginBottom: "20px" }}>
//                 <button onClick={()=>addToDb()} className="px-5 py-1 bg-blue-100 capitalize">{added?"added":"add"}</button>
//                 {imageUrl && (
//                   <img
//                     src={imageUrl}
//                     alt={item.title}
//                     style={{ width: "100%", height: "100px", objectFit: "contain" }}
//                   />
//                 )}
//                 <a href={item.link} target="_blank" rel="noopener noreferrer">
//                   <h4 style={{ color: "#0077cc" }}>{item.title}</h4>
//                 </a>
//                 <p>{item.snippet}</p>
//               </div>
//             );
//           })
//         ) : (
//           <p>No data found.</p>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default SearchBar;


import { useState, useEffect } from "react";
import hikdata from "../assets/data.json";
import { motion } from "framer-motion";

// const googleKey = import.meta.env.VITE_REACT_APP_GOOGLE_KEY || "";
// const googleProjID = import.meta.env.VITE_REACT_APP_GOOGLE_PROJ_ID || "";
const hikData = hikdata.HIK;

const SearchBar = () => {
  const [products, setProducts] = useState<{ id: number; title: string; thumbnail: string; price: number }[]>([]);
  const [searchText, setSearchText] = useState("");
  const [apiResults, setApiResults] = useState<{ id: number; title: string; thumbnail: string; price: number }[]>([]);
  const [hikResults, setHikResults] = useState<{ name: string; description: string; price: number }[]>([]);
  const [itemsResult,setItemsResult] = useState<{pagemap?: { cse_image?: { src: string }[] };link: string; title: string; snippet: string; }[]>([])
  const [googleResults, setGoogleResults] = useState<{ 
    pagemap?: { cse_image?: { src: string }[] }; 
    link: string; 
    title: string; 
    snippet: string; 
  }[]>([]);

  // const [items, setItems] = useState<{ id: string; title: string; imageUrl: string; link: string; desc: string }[]>( JSON.parse(localStorage.getItem("items") || '') || []);
  // const [addedIds, setAddedIds] = useState<string[]>(  JSON.parse(localStorage.getItem("items") || '') || []);
const [items, setItems] = useState<{ id: string; title: string; imageUrl: string; link: string; desc: string }[]>(() => {
  try {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse localStorage items:", e);
    return [];
  }
});
const [addedIds, setAddedIds] = useState<string[]>(() => {
  try {
    const stored = localStorage.getItem("items");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map((item: any) => item.link);
  } catch (e) {
    console.error("Failed to parse addedIds from localStorage:", e);
    return [];
  }
});



  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setApiResults([]);
      setHikResults([]);
      setItemsResult([])
      setGoogleResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      const apiFiltered = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setApiResults(apiFiltered);

      if (apiFiltered.length === 0) {
        const hikFiltered = hikData.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setHikResults(
          hikFiltered.map((item) => ({
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
          }))
        );
        if(hikFiltered.length===0){
          const itemFilterd :any= items.filter((item)=>
            item.title.toLowerCase().includes(searchText.toLowerCase()))
          setItemsResult(itemFilterd)
        }
        // && itemsResult.length > 0
        if (hikFiltered.length===0   ) {
          const params = new URLSearchParams({
            // key: googleKey,
key:"AIzaSyB_8Dzwm9ZMYdV1qhZay4_lUmMHV2uRnpI",
            // cx: googleProjID,
            cx:"f1699ff926a0c490b",
            q: searchText,
          });

          fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => setGoogleResults(data.items || []))
            .catch((err) => console.error("Google Search Error:", err));
        } else {
          setGoogleResults([]);
        }
      } else {
        setHikResults([]);
        setGoogleResults([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, products]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(storedItems);
    const ids = storedItems.map((item: any) => item.link); 
    setAddedIds(ids);
  }, []);

  // useEffect(() => {
  //   // localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  const addToDb = (item: any) => {
    const uniqueId =item; 
    if (addedIds.includes(uniqueId)) return; 
    
    const newItem = {
      id: uniqueId,
      title: item.title,
      imageUrl: item.pagemap?.cse_image?.[0]?.src || "",
      link: item.link,
      desc: item.snippet,
    };
    
    localStorage.setItem("items", JSON.stringify([...items, newItem]));
    setItems((prev) => [...prev, newItem]);
    setAddedIds((prev) => [...prev, uniqueId]);
  };

  console.log(JSON.parse(localStorage.getItem("items") || "[]"));
  
  // const addToDb = (item: any) => {
  //   const newItem = {
  //     id: Date.now(),
  //     title: item.title,
  //     imageUrl: item.pagemap?.cse_image?.[0]?.src || "",
  //     link: item.link,
  //     desc: item.snippet,
  //   };
  
  //   const updatedItems = [...items, newItem];
  //   setItems(updatedItems);
  //   setAddedIds((prev) => [...prev, newItem.link]); 
  // };
  // console.log(JSON.parse(localStorage.getItem("items") || "[]"));
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mt-4">Search Products</h2>
      <input
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
        className="mt-4 px-4 py-2 border border-gray-400 rounded w-1/2"
      />

      <div className="flex w-full h-[85vh]">
        {/* Section 1 */}
        <div className="w-1/3 p-6 border-r overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">CP Data Results</h3>
          {apiResults.length > 0 ? (
            apiResults.map((product) => (
              <div key={product.id} className="mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-[100px] object-contain"
                />
                <h4 className="font-semibold">{product.title}</h4>
                <p>${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Section 2 */}
        <div className="w-1/3 p-6 border-r overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Public Data Results</h3>
          {hikResults.length > 0 ? (
            hikResults.map((item, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            ))
          ) : (

            <>
             <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Saved Items</h3>
           { itemsResult.length>0? items.map((item) => (
              <motion.div
                key={item.id}
                className="mb-4 p-3 border rounded bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-[100px] object-contain mb-2"
                  />
                )}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h4 className="text-blue-600 font-semibold">{item.title}</h4>
                </a>
                <p>{item.desc}</p>
              </motion.div>
            )):(<div>no result found</div>)}
          </div>
            </>
          )}
           
 
        </div>

        {/* Section 3 */}
        <div className="w-1/3 p-6 overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Google Results</h3>
          {googleResults.length > 0 ? (
            googleResults.map((item, idx) => {
              const imageUrl = item.pagemap?.cse_image?.[0]?.src || "";
              return (
                <div key={idx} className="mb-6 border-b pb-4">
                  <button
  onClick={() => addToDb(item)}
  disabled={addedIds.includes(item.link)}
  className={`px-4 py-1 mb-2 rounded capitalize ${
    addedIds.includes(item.link)
      ? "bg-green-300 cursor-not-allowed"
      : "bg-blue-100 hover:bg-blue-200"
  }`}
>
  {addedIds.includes(item.link) ? "added" : "add"}
</button>

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-[100px] object-contain"
                    />
                  )}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h4 className="text-blue-600 font-semibold mt-2">{item.title}</h4>
                  </a>
                  <p>{item.snippet}</p>
                </div>
              );
            })
          ) : (
            <p>No data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
