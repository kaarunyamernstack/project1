import React  from "react";


function Header({ onCreateClick }) {
    return(
        <header className="bg-indigo-900 p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white tracking-wide"><span className="p-1 border m-1 rounded-sm"><i class="fa-solid fa-bars-progress"></i></span>
                    QuickKANBAN
                </h1>
                <button className="text-white border p-2 m-2 rounded-xl hover:bg-blue-800"><span className="p-2"
                onClick={onCreateClick}><i className="fa-solid fa-plus"></i></span>
                    Create Task
                </button>
            </div>
        </header>
    )

}

export default Header