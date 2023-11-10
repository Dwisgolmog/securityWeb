function SingUp() {
    return (
        <div class="min-h-screen flex justify-center items-center bg-white">
            <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                <div class="py-8">
                    <img width="30" class="-mt-10" src="https://www.paypalobjects.com/images/shared/momgram@2x.png" />
                </div>


                <input class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="E-Mail" />
                <input class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Password" />
                <input class="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="Name" />
                
                
                <div class="box-content h-10"></div>

                <div class="flex flex-col space-y-5 w-full">
                    <button class="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">SingUp</button>
                </div>
            </div>
        </div>
    );
}

export default SingUp