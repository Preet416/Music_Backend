export const getAllTracks = async () => {
  const res = await fetch("http://localhost:4000/api/tracks");
  return res.json();
};
