"use client";
import { storage } from "@/firease";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [pickedImage, setPickedImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const pickerRef = useRef<any>(null);

  const storageRef = ref(storage, "images/anotherone");

  const selectImage = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent: any) => {
      setPickedImage(readerEvent.target.result);
      console.log("picked image >>>", readerEvent.target.result)
    };
  };

  const uploadFileToFB = async () => {
    setLoading(true)
    try {
      if(pickedImage){
        await uploadString(storageRef, pickedImage, 'data_url')
        const url = await getDownloadURL(storageRef)
        console.log("downloadable url >>>", url);
        setImageUrl(url)
      }
    } catch (error) {
      console.log("error >>>", error)
    }
    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">

      <div
        onClick={() => pickerRef.current.click()}
        className="relative h-[16rem] w-[16rem] border cursor-pointer flex flex-col items-center justify-center overflow-hidden rounded-lg "
      >
        {pickedImage ? (
          <Image src={pickedImage} fill style={{ objectFit: "cover" }} alt="" />
        ) : (
          <p>Pick image</p>
        )}
      </div>

      <input
        ref={pickerRef}
        onChange={(e) => selectImage(e)}
        type="file"
        accept=".png, .jpg, .jpeg"
        hidden
      />

      <button
        onClick={uploadFileToFB}
        type="button"
        className="py-4 px-6 rounded-md bg-sky-400 text-white my-[1rem]"
      >
        {loading ? "Loading..." : "Upload image"}
      </button>

      <div className="relative h-[16rem] w-[16rem] border flex flex-col items-center justify-center overflow-hidden rounded-lg ">
          {imageUrl && (
            <Image 
              src={imageUrl}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          )}
      </div>
    </main>
  );
}
