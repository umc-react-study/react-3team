import FilterControl from "./FilterControl";
import ProductList from "./ProductList";

export default function ZustandPage() {
    return (
        <div className="bg-[#242424] min-h-screen p-4 gap-4 flex flex-col">
            <FilterControl />
            <ProductList />
        </div>
    );
}