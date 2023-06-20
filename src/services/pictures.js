import { http } from "./config.js";

export default {
    savePictures: (pictures) => {
        try {
            pictures.forEach(picture => {
                http.post("imagens", picture)
            });
            return true;
        }catch(error){
            return console.log(error);
        }
    },
    getPictures: async (idSample) => {
        try{
            return await http.get(`imagens/${idSample}`);
        }catch(error){
            return console.log(error);
        }
    },
    deletePictures: (pictures) => {
        try{
            pictures.forEach(picture => {
                http.delete(`imagens/${picture._id}`);
            })
            return true;
        }catch(error){
            return console.log(error);
        }
    }
}