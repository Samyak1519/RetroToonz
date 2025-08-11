import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import { FaUpload, FaImage, FaPlay } from "react-icons/fa";

export default function AddShowPage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        language: "English",
        tags: [],
        thumbnail: null,
        thumbnailPreview: "",
        video: null,
        videoPreview: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setForm((prev) => ({ ...prev, tags: selectedOptions }));
    };

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                thumbnail: file,
                thumbnailPreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                video: file,
                videoPreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = () => {
        // Here you’d send `form` to your backend
        console.log("Form Data:", form);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 sm:p-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Form */}
                    <div className="order-1 lg:order-2">
                        <h1 className="text-2xl font-semibold mb-6">🎬 Add a New Show</h1>

                        {/* Title */}
                        <label className="block mb-4">
                            <span className="block text-sm font-semibold mb-1">Show Title</span>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500"
                                placeholder="Enter show title"
                            />
                        </label>

                        {/* Description */}
                        <label className="block mb-4">
                            <span className="block text-sm font-semibold mb-1">Description</span>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500"
                                placeholder="Enter show description"
                            />
                        </label>

                        
                        {/* Tags */}
                        <label className="block mb-4">
                            <span className="block text-sm font-semibold mb-1">Tags (Categories)</span>
                            <div className="flex flex-wrap gap-2  py-3 rounded-lg ">
                                {["Action", "Comedy", "Drama", "Sci-Fi", "Fantasy", "Adventure"].map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => {
                                            setForm((prev) => {
                                                const exists = prev.tags.includes(tag);
                                                return {
                                                    ...prev,
                                                    tags: exists
                                                        ? prev.tags.filter((t) => t !== tag)
                                                        : [...prev.tags, tag],
                                                };
                                            });
                                        }}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all 
                    ${form.tags.includes(tag)
                                                ? "bg-purple-600 text-white shadow-lg"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </label>

                        {/* Thumbnail Upload */}
                        <label className="block mb-4">
                            <span className="block text-sm font-semibold mb-1">Thumbnail Image</span>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="thumbnail"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition"
                                >
                                    {form.thumbnailPreview ? (
                                        <img
                                            src={form.thumbnailPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <>
                                            <FaUpload className="text-3xl text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-400">
                                                Click or drag to upload
                                            </span>
                                        </>
                                    )}
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleThumbnailUpload}
                                    />
                                </label>
                            </div>
                        </label>

                        {/* Video Upload */}
                        <label className="block mb-6">
                            <span className="block text-sm font-semibold mb-1">Show Video</span>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="video"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition"
                                >
                                    {form.videoPreview ? (
                                        <video
                                            src={form.videoPreview}
                                            className="w-full h-full object-cover rounded-lg"
                                            controls
                                        />
                                    ) : (
                                        <>
                                            <FaUpload className="text-3xl text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-400">
                                                Click or drag to upload
                                            </span>
                                        </>
                                    )}
                                    <input
                                        id="video"
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleVideoUpload}
                                    />
                                </label>
                            </div>
                        </label>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-lg font-semibold shadow-lg transition"
                        >
                            Add Show
                        </button>
                    </div>

                    {/* Live Preview */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl font-semibold mb-4">📺 Live Preview</h2>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
                            {/* Thumbnail or Video */}
                            <div className="relative w-full h-44">
                                {form.thumbnailPreview ? (
                                    <img
                                        src={form.thumbnailPreview}
                                        alt="Show Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-800 text-gray-500">
                                        <FaImage className="text-4xl" />
                                    </div>
                                )}
                                <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg">
                                    <FaPlay />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-1">
                                    {form.title || "Untitled Show"}
                                </h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    {form.description || "No description provided yet."}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {form.language} | {form.tags.join(", ") || "No tags"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
