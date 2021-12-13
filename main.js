
var result = `
/*
 * 老师们，同学们你好，我是七②班的缪鸿轩
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 *
*/
* {
    transition: all 1s;
}
html {
    font-size: 16px;
}
.code-wrapper {
    width: 50%;
    left: 0;
    position: fixed;
    height: 100%;
}
/* 调整一下代码框大小 */
#code {
    border:1px solid transparent;
    padding: 16px;
    overflow: hidden;
}
#code {
    left: 0;
    width: 100%;
    height:100%;
}
/* 让代码呼吸起来 */
#code{
  animation: breathe 1s infinite alternate-reverse;
}
/* 给代码加上一点点高亮 */
.token.comment {
    color: slategray;
}
.token.property {
    color: #f92672;
}
.token.selector {
    color: #a6e22e;
}

/*
* 现在正式开始写 Markdown 啦~
* 准备一张白纸
*/
#paper {
    background-color: #272822;
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 24px;
    color: black;
}
#paper .content{
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
}
`
var result2 = `
#paper {
}
`
var result3 = `
/* 使用一个库 marked.js 把 markdown 转化成 HTML*/
`
var result4 = `
/* 还差一点点 */
.markdown-body {
    padding: 16px;
    background-color: white;
    overflow: auto;
}

/* Done~ 简历完成啦~ */
`
var md = `
# 个人信息
我叫缪鸿轩，来自七年级二班。
> 这次我竞选的职务是大队委，虽然我知道要做好班级的大队委并不容易，但我相信，凭着我对工作的尽心尽职、任劳任怨，凭着我与大家同舟共济的深厚友情，希望同学们能给我一个做老师的好帮手、同学的服务员的机会。

# 竞选宣言

我的竞选口号是：“**做一个彻头彻尾的平民班长，做一个有广泛亲和力的和平使者**”。大队委，应是老师和学生之间的一座桥梁，我保证当好助手，协助老师搞好班级;我也保证在任何情况下，想同学之所想，急同学这所急。

# 我的荣誉与爱好
## 编程
掌握C++、python、PHP、html、markdown、css、JavaScript等语言

在全国青少年信息学奥林匹克联赛中斩获pj2=(普及二等)

> ps：全国青少年信息学奥林匹克联赛是中国信息学中最权威的比赛，属于五大竞赛之一，与奥数平起平坐。

蓝桥杯上海赛区一等奖

STEMA全国前95%

## 书法
书法是我的**爱好**之一，他令我愉悦，心平气和的面对生活中的困难，同时也帮助我修身养性。

获得上海市书法家学会颁发的证书

目前在学习米芾行书和欧阳询楷书

获得鸟巢杯入围展览资格

获得中华少年杯金奖

获得足迹杯二等奖

## 演讲
我曾经多次登上科学会堂和升旗仪式神圣的舞台，做过关于经济、科技、学习的演讲。

## 学习
曾经同时斩获**数学荣誉学生**、**语文荣誉学生**、**英语荣誉学生**、**综合荣誉学生**、**红蚂蚁**、所有评价标准全部**超五星**等荣誉

## 杂项
International Junior Science Olympics first prise（国际初中生科学奥林匹克一等奖）

The Insider News 设计师

# 对未来的期望

当然，作为大队委，光有为班级服务的”红”心是不够的。作为班级的灵魂人物，大队委具有统领全局的大德大能，我相信自己是够条件的，因为我有较强的组织能力，会让每位班委成员发挥各自的潜能，扬长避短，形成拳头优势。我方方面面的长处，相信大家有目共睹。

`
function writeMarkdown(markdown,fn){
    let domMarkdown = document.querySelector('#paper .content')
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domMarkdown.innerHTML = markdown.substring(0,n)
        domMarkdown.scrollTop = domMarkdown.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
        domCode.scrollTop = domCode.scrollHeight
        styleTag.innerHTML = prefix + code.substring(0,n)
        if(n >= code.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                writeCode(result + result2,result3,()=>{
                    convertMarkdownToHtml(()=>{
                        writeCode(result + result2 + result3,result4,()=>{
                            console.log('Done')
                        })
                    })
                })
            })
        })
    })
})
function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = "paper"
    var content = document.createElement('pre')
    content.className = "content"
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.style = 'background-color:white'
    markdownContainer.replaceWith(div)
    fn && fn.call()
}
