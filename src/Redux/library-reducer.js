

let initialState = {
    playlists:[
        //Объект Категория
        {
            //Ид самой категории
            id: 123,
            //Ид создателя
            creatorId:null,
            //Название категории
            name:"Abobus",
            //Приоритет (задается пользователем)
            priority:0,
            //Дата создания плейлиста
            creationDate:"6 june, 20:20",
            //Видео внутри плейлиста
            videos:[
                //Объект Видео
                {
                    id:1,
                    link:"https://www.youtube.com/watch?v=tyXOcT33df8",
                    name:"test1",
                    description:"Тестовое описание для видео под номером 1. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
                    priority:0,
                    addDate:"6 june, 20:20",
                },
                {
                    id:2,
                    link:"https://www.youtube.com/watch?v=tyXOcT33df8",
                    name:"test2",
                    description:"Тестовое описание для видео под номером 2. Тут по наведеню отображается описание к видео, которое добавляет пользователь.",
                    priority:0,
                    addDate:"6 june, 20:20",
                }
            ]
        },
    ]
};
const libraryReducer = (state = initialState, action) => {
    
    switch (action.type) {

        default: return state;
    };
};


export default libraryReducer;

/*
{

}


*/