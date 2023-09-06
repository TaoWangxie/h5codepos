export const gridTags = [
    {
        id: '0',
        label: '矩形',
        comKey: 'Rectangle',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 100,
            height: 100
        },
        config: {
            data: {
                bgcSrc: '',
                background: '',
                opacity: 1,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 0,
                borderColor: '#000000',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPositionX: 'left',
                backgroundPositionY: 'top',
            },
            fieldList: [
                {
                    label: "边框", prop: "border", type: 'array', children: [
                        { label: "", prop: "borderWidth", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { label: "", prop: "borderStyle", type: "select", width: '80px', list: 'borderStyleList' },
                        { label: "", prop: "borderRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { label: "", prop: "borderColor", type: "color", width: '30px' },
                    ]
                },
                { label: "不透明度", prop: "opacity", type: "inputNumber", min: 0.1, step: 0.1 },
                { label: "背景色", prop: "background", type: "color" },
                { label: "背景地址", prop: "bgcSrc", type: "img" },
                { label: "背景重复", prop: "backgroundRepeat", type: "select", list: 'backgroundRepeatList' },
                { label: "背景尺寸", prop: "backgroundSize", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundSizeList' },
                {
                    label: "背景位置", prop: "backgroundPosition", type: 'array', children: [
                        { label: "", prop: "backgroundPositionX", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionXList' },
                        { label: "", prop: "backgroundPositionY", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionYList' },
                    ]
                },
            ],
            listTypeInfo: {
                borderStyleList: [
                    {
                        id: 'solid',
                        name: '实线'
                    },
                    {
                        id: 'dashed',
                        name: '虚线'
                    },
                    {
                        id: 'dotted',
                        name: '圆点'
                    },
                ],
                backgroundRepeatList: [
                    {
                        id: 'no-repeat',
                        name: '不重复'
                    },
                    {
                        id: 'repeat',
                        name: '重复'
                    },
                ],
                backgroundSizeList: [
                    {
                        id: '100% 100%',
                        name: '100% 100%'
                    },
                    {
                        id: 'contain',
                        name: 'contain'
                    },
                    {
                        id: 'cover',
                        name: 'cover'
                    },
                    {
                        id: 'auto',
                        name: 'auto'
                    },
                ],
                backgroundPositionXList: [
                    {
                        id: 'left',
                        name: '居左'
                    },
                    {
                        id: 'right',
                        name: '居右'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
                backgroundPositionYList: [
                    {
                        id: 'top',
                        name: '置顶'
                    },
                    {
                        id: 'bottom',
                        name: '置底'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
            }
        },
        dataSource: {
            data: {
                bgcSrc: '',
            },
            fieldList: [
                { label: "背景地址", prop: "bgcSrc", type: "img" },
            ]
        }
    },
    {
        id: '1',
        label: '文本',
        comKey: 'Text',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 150,
            height: 50
        },
        config: {
            data: {
                text: '我是文本呀',
                fontSize: 16,
                fontWeight: 'normal',
                color: '#303133',
                background: '',
                lineHeight: 1,
                letterSpacing: 1,
                opacity: 1,
                borderWidth: 0,
                borderStyle: 'solid',
                borderRadius: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderColor: '#000000',
                bgcSrc: '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPositionX: 'left',
                backgroundPositionY: 'top',
            },
            fieldList: [
                { label: "文本", prop: "text", type: "input" },
                {
                    label: "字号", prop: "font", type: 'array', children: [
                        { label: "", prop: "fontSize", type: "inputNumber", controlsPosition: "right", min: 12 },
                        { label: "", prop: "fontWeight", type: "select", list: 'fontWeightList' },
                    ]
                },
                { label: "字体颜色", prop: "color", type: "color" },
                { label: "背景色", prop: "background", type: "color" },
                { label: "行高", prop: "lineHeight", type: "inputNumber", min: 0.1, step: 0.1 },
                { label: "字间距", prop: "letterSpacing", type: "inputNumber", min: 0.1, step: 0.1 },
                { label: "不透明度", prop: "opacity", type: "inputNumber", min: 0.1, step: 0.1 },
                { label: "水平对齐", prop: "justifyContent", type: "radio", list: 'justifyContentList' },
                { label: "垂直对齐", prop: "alignItems", type: "radio", list: 'alignItemsList' },
                {
                    label: "边框", prop: "border", type: 'array', children: [
                        { label: "", prop: "borderWidth", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { label: "", prop: "borderStyle", type: "select", width: '80px', list: 'borderStyleList' },
                        { label: "", prop: "borderRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { label: "", prop: "borderColor", type: "color", width: '30px' },
                    ]
                },
                { label: "背景地址", prop: "bgcSrc", type: "img" },
                { label: "背景重复", prop: "backgroundRepeat", type: "select", list: 'backgroundRepeatList' },
                { label: "背景尺寸", prop: "backgroundSize", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundSizeList' },
                {
                    label: "背景位置", prop: "backgroundPosition", type: 'array', children: [
                        { label: "", prop: "backgroundPositionX", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionXList' },
                        { label: "", prop: "backgroundPositionY", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionYList' },
                    ]
                },
            ],
            listTypeInfo: {
                fontWeightList: [
                    {
                        id: 'normal',
                        name: '正常'
                    },
                    {
                        id: 'bold',
                        name: '加粗'
                    },
                ],
                borderStyleList: [
                    {
                        id: 'solid',
                        name: '实线'
                    },
                    {
                        id: 'dashed',
                        name: '虚线'
                    },
                    {
                        id: 'dotted',
                        name: '圆点'
                    },
                ],
                justifyContentList: [
                    {
                        label: '上对齐',
                        value: 'flex-start'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '下对齐',
                        value: 'flex-end'
                    },
                ],
                alignItemsList: [
                    {
                        label: '上对齐',
                        value: 'flex-start'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '下对齐',
                        value: 'flex-end'
                    },
                ],
                backgroundRepeatList: [
                    {
                        id: 'no-repeat',
                        name: '不重复'
                    },
                    {
                        id: 'repeat',
                        name: '重复'
                    },
                ],
                backgroundSizeList: [
                    {
                        id: '100% 100%',
                        name: '100% 100%'
                    },
                    {
                        id: 'contain',
                        name: 'contain'
                    },
                    {
                        id: 'cover',
                        name: 'cover'
                    },
                    {
                        id: 'auto',
                        name: 'auto'
                    },
                ],
                backgroundPositionXList: [
                    {
                        id: 'left',
                        name: '居左'
                    },
                    {
                        id: 'right',
                        name: '居右'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
                backgroundPositionYList: [
                    {
                        id: 'top',
                        name: '置顶'
                    },
                    {
                        id: 'bottom',
                        name: '置底'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
            }
        },
        dataSource: {
            data: {
                text: '我是文本呀',
                bgcSrc: '',
            },
            fieldList: [
                { label: "文本", prop: "text", type: "input" },
                { label: "背景地址", prop: "bgcSrc", type: "img" },
            ]
        }
    },
    {
        id: '2',
        label: '图片',
        comKey: 'ImgBox',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 150,
            height: 150
        },
        config: {
            data: {
                src: 'https://element-plus.gitee.io/images/figure-1.png',
            },
            fieldList: [
                { label: "图片地址", prop: "src", type: "img" },
            ],
        },
        dataSource: {
            data: {
                src: '',
            },
            fieldList: [
                { label: "图片地址", prop: "src", type: "img" },
            ]
        }
    },
    {
        id: '3',
        label: '轮播',
        comKey: 'SwiperBox',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 300,
            height: 200
        },
        config: {
            aceCode: '',
            data: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: false,
                autoplay: {
                    isautoplay: true,
                    delay: 2000,
                    disableOnInteraction: false
                },
                freeMode: false
            },
            fieldList: [
                { label: "轮播数量", prop: "slidesPerView", type: "inputNumber" },
                { label: "间隔", prop: "spaceBetween", type: "inputNumber" },
                { label: "是否循环", prop: "loop", type: "radio", list: 'loopList' },
                {
                    label: "自动播放", prop: "autoplay", type: "object", children: [
                        { label: "开关", prop: "isautoplay", type: "radio", list: 'autoplayList' },
                        { label: "延时", prop: "delay", type: "inputNumber", controlsPosition: "right", min: 500, step: 500 },
                        { label: "点击继续", prop: "disableOnInteraction", type: "radio", list: 'autoplayList' },
                    ]
                },
                { label: "自由模式", prop: "freeMode", type: "radio", list: 'autoplayList' },
            ],
            listTypeInfo: {
                loopList: [
                    {
                        label: '是',
                        value: true
                    },
                    {
                        label: '否',
                        value: false
                    }
                ],
                autoplayList: [
                    {
                        label: '是',
                        value: true
                    },
                    {
                        label: '否',
                        value: false
                    }
                ],
            }
        },
        dataSource: {
            data: {
                slide: [
                    {
                        src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        link: '11'
                    },
                    {
                        src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                        link: '22'
                    },
                ],
            },
            fieldList: [
                { label: "轮播配置", prop: "slide", type: "list", list: 'slideList' },
            ],
            listTypeInfo: {
                slideList: {
                    columns: [
                        {
                            label: "图片地址",
                            prop: "src",
                            colType: "slot",
                            width: 200,
                        },
                        {
                            label: "链接",
                            prop: "link",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "操作",
                            prop: "operate",
                            colType: "slot",
                            width: 56,
                            fixed: 'right'
                        },
                    ],
                    listTypeInfo: {},
                    hideConfig: ['checkbox', 'serial']
                }
            }
        }
    },
    {
        id: '4',
        label: '视频盒子',
        comKey: 'VideoBox',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 300,
            height: 450
        },
        config: {
            data: {
                src: 'https://lf3-cdn-tos.bytescm.com/obj/eden-cn/lmeh7pfuho/campus/campus_intro_20200522.mp4',
            },
            fieldList: [
                { label: "地址", prop: "src", type: "input" },
            ],
        },
        dataSource: {
            data: {
                src: '',
            },
            fieldList: [
                { label: "地址", prop: "src", type: "input" },
            ]
        }
    },
    {
        id: '5',
        label: '图表',
        comKey: 'Vechart',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 400,
            height: 300
        },
        config: {
            aceCode:
                `{
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
}`,
            data: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            },
            fieldList: [
            ],
        },
        dataSource: {}
    },
    {
        id: '6',
        label: '表格',
        comKey: 'Table',
        src: 'https://phpimg.ziroom.com/40e7120d-19a6-4b59-b43e-64717a72a603.png',
        style: {
            width: 256,
            height: 128
        },
        config: {
            data: {
                data: [
                    {
                        code1: "11",
                        code2: "22",
                        code3: "33",
                    },
                ],
                columns: [
                    {
                        label: "字段1",
                        prop: "code1",
                        width: null,
                        align: "center",
                        headerBackground: "",
                        background: "",
                    },
                    {
                        label: "字段2",
                        prop: "code2",
                        width: null,
                        align: "center",
                        headerBackground: "",
                        background: "",
                    },
                    {
                        label: "字段3",
                        prop: "code3",
                        width: null,
                        align: "center",
                        headerBackground: "",
                        background: "",
                    },
                ],
                border: true,
                rowHeight: 20,
                fontSize: 14,
                headerColor: '#000',
                color: '#000',
                headerAlign: "center",
                headerBorderColor: '',
                headerBackground: '',
                background: '',
                borderColor: '',
            },
            fieldList: [
                { label: "列配置", prop: "columns", type: "list", list: 'columnsList' },
                { label: "边框", prop: "border", type: "select", list: 'borderList' },
                { label: "行高", prop: "rowHeight", type: "inputNumber", min: 0, step: 1 },
                { label: "字号", prop: "fontSize", type: "inputNumber", min: 1, step: 1 },
                { label: "头对齐", prop: "headerAlign", type: "select", list: 'headerAlignList' },
                { label: "头背景", prop: "headerBackground", type: "color" },
                { label: "头字体色", prop: "headerColor", type: "color" },
                { label: "头边框色", prop: "headerBorderColor", type: "color" },
                { label: "背景", prop: "background", type: "color" },
                { label: "字体色", prop: "color", type: "color" },
                { label: "边框色", prop: "borderColor", type: "color" },
            ],
            listTypeInfo: {
                borderList: [
                    {
                        id: true,
                        name: '是'
                    },
                    {
                        id: false,
                        name: '否'
                    },
                ],
                headerAlignList: [
                    {
                        id: 'center',
                        name: '居中'
                    },
                    {
                        id: 'left',
                        name: '居左'
                    },
                    {
                        id: 'right',
                        name: '居右'
                    },
                ],
                columnsList: {
                    columns: [
                        {
                            label: "列名称",
                            prop: "label",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "列字段",
                            prop: "prop",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "列宽",
                            prop: "width",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "对齐方式",
                            prop: "align",
                            colType: "select",
                            list: 'alignList',
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "头背景色",
                            prop: "headerBackground",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "背景色",
                            prop: "background",
                            colType: "input",
                            col: {
                                clearable: true
                            },
                        },
                        {
                            label: "操作",
                            prop: "operate",
                            colType: "slot",
                            width: 56,
                            fixed: 'right'
                        },
                    ],
                    listTypeInfo: {
                        alignList: [
                            {
                                id: 'center',
                                name: '居中'
                            },
                            {
                                id: 'left',
                                name: '居左'
                            },
                            {
                                id: 'right',
                                name: '居右'
                            },
                        ]
                    },
                    hideConfig: ['checkbox', 'serial']
                }
            }
        },
        dataSource: {}
    },
]