import z from 'zod';

export const TOOL_NAME = 'ecommerceMarketing';

// 默认提示词定义
export const DEFAULT_PROMPTS = {
  kvPoster:
    'KV style,赛博朋克风电商促销场景，3D卡通渲染风格。卡通狐狸形象，橙白渐变毛色，头顶炫彩闪电纹路，佩戴蓝色带"Jiguang"字样的AR眼镜，身着荧光蓝带紫色光带的冲锋衣、黑色机能风短裤，脚踩绿色悬浮滑板；周围环绕着极光能量饮料罐（霓虹紫色包装，标注"闪电能量"）、极光维生素水（炫彩镭射包装）等产品。卡通狐狸单脚立于悬浮滑板，双手展开保持平衡，身体前倾呈现高速滑行姿态，尾巴扬起散发粒子光效。赛博朋克风格的霓虹蓝色调未来街景，有荧光粉与 cyan 蓝色的全息广告牌，巨型机械手臂悬挂着"超品日"立体字样，银色传送带滚动展示商品包装盒，空中漂浮着透明数据流与折扣标签。色调以霓虹蓝、荧光粉、金属银为主，光线充满激光射线与全息投影效果；产品包装呈现金属拉丝与荧光涂层质感，悬浮滑板底部喷射蓝色离子气流，背景建筑表面布满数码纹理与流动的光带。顶部红色立体艺术字"狂欢盛典 限时5折"，字体厚重带有金属镶边与霓虹光晕，数字"5"为渐变荧光绿色；下方蓝色六边形立体字"跨店每满300减60"，字体棱角分明带有电路板纹理，内部填充流动光效。充满科技感与未来元素的电商大促场景，动态光线与悬浮元素交织，传递出潮流科技与购物狂欢的震撼视觉体验。',
  petPoster:
    '生成一个以宠物为主题的卡通风格海报，包含多种可爱的宠物形象和活泼的背景元素。海报应传达出欢乐、友好的氛围，适合家庭和儿童观看。请确保海报色彩鲜艳，细节丰富。',
  productPoster:
    '商业级奢侈品香水摄影，方形深琥珀色香水瓶（瓶身通透莹润，内部液体浓郁且折射暖光，瓶身印 "LOUIS MARCO Deep Woody" 清晰字样），顶部配纹理细腻、质感温润的木质瓶盖；香水瓶置于深棕色菱格纹皮革表面（皮革柔软有光泽、纹理精致）；背景为暖棕到深棕的渐变色调，一束柔和暖黄色光线精准照射，在瓶身营造通透光泽感，细腻勾勒木质瓶盖纹理，让皮革表面形成柔和明暗过渡；整体氛围奢华温暖，光影层次分明，细节极致精致，凸显高端商业产品质感，8K 高清画质。',
  xiaohongshuPoster:
    '升学季海报,主标题写着"逐梦学海,金榜有名",白色毛笔字,蓝金配色,一个青年高举毕业证书,表情自信,周围飘散着桂花和光芒,空中飞舞彩纸片,简约大气,扁平插画风格,下方副标语"荣耀加冕,筑梦新程"',
} as const;

export namespace EcommerceMarketingModel {
  // KV海报参数
  export const kvPosterParams = z.object({
    prompt: z
      .string()
      .optional()
      .describe('提示词，建议：FY style + 自然语言描述内容')
      .default(DEFAULT_PROMPTS.kvPoster),
  });

  // 宠物海报参数
  export const petPosterParams = z.object({
    prompt: z
      .string()
      .optional()
      .describe('提示词')
      .default(DEFAULT_PROMPTS.petPoster),
  });

  // 产品海报参数
  export const productPosterParams = z.object({
    prompt: z
      .string()
      .optional()
      .describe('提示词，建议：Product Scene Poster + 自然语言描述内容')
      .default(DEFAULT_PROMPTS.productPoster),
  });

  // 小红书海报参数
  export const xiaohongshuPosterParams = z.object({
    prompt: z
      .string()
      .optional()
      .describe('提示词，建议：FY style + 自然语言描述内容')
      .default(DEFAULT_PROMPTS.xiaohongshuPoster),
  });

  // 产品图精修参数
  export const productImageRetouchingParams = z.object({
    productImageUrl: z.url().describe('商品图的URL地址'),
  });

  // 场景渲染参数
  export const sceneRenderingParams = z.object({
    productImageUrl: z.url().describe('产品图的URL地址'),
  });

  // 获取图片UUID参数
  export const getImageByUUIDParams = z.object({
    generatedUUID: z.string().describe('图片的UUID'),
  });

  // 类型导出
  export type KvPosterParams = z.infer<typeof kvPosterParams>;
  export type PetPosterParams = z.infer<typeof petPosterParams>;
  export type ProductPosterParams = z.infer<typeof productPosterParams>;
  export type XiaohongshuPosterParams = z.infer<typeof xiaohongshuPosterParams>;
  export type ProductImageRetouchingParams = z.infer<
    typeof productImageRetouchingParams
  >;
  export type SceneRenderingParams = z.infer<typeof sceneRenderingParams>;
  export type GetImageByUUIDParams = z.infer<typeof getImageByUUIDParams>;
}

// Helper 工具提示词定义
export namespace EcommerceMarketingHelpers {
  export const KV_POSTER_TIPS = `推荐提示词：

1. ${DEFAULT_PROMPTS.kvPoster}

2. 赛博朋克风音乐节舞台场景，主体包含欢乐熊猫（白色熊猫形态，头戴蓝色荧光耳机，黑色圆眼睛，系绿色霓虹围巾，一手持银色麦克风、一手举巨型荧光竹筒，表情欢快洋溢）与炫酷机器人（专注弹奏黑色带紫红色闪电纹理的电吉他，神态投入）；背景有紫色霓虹勾勒的悬浮飞船轮廓、舞台灯光架、音响设备，还有蓝色机器人弹奏发光键盘、粉色机器人击打电子鼓组、黑色带护目镜机器人等角色点缀；细节上以紫、蓝、粉霓虹色为主色调，光线绚丽且动感十足，采用大透视视角增强空间深度，低角度镜头突出舞台高度感，高角度镜头俯瞰全场动态；场景层次丰富，前景为角色特写，中景是舞台设备，背景点缀霓虹建筑轮廓；光影质感强烈，霓虹灯投射出斑斓阴影，材质呈现3D卡通渲染的光滑与金属感；文字特效包括左上角"熊猫乐园 × 机械之城"品牌标识，右侧科技感白色立体字"熊猫机械狂欢团"及蓝色手写风"Panda Mech Party"英文，字体为棱角分明的立体设计，英文采用流畅草书风格；整体氛围是活力四射、童趣与赛博朋克风融合的跨界音乐派对，画面热闹且充满动感。

3. 3D渲染的烘焙主题促销图形，场景设定在浅黄色麦田围绕的圆形木栅栏小烘焙坊，栅栏带清晰木纹纹理，内部有几只卡通面包造型玩偶（全麦色吐司造型、浅黄牛角包造型），或坐或站，神态憨萌。烘焙坊周围分布多样元素...`;

  export const PET_POSTER_TIPS = `推荐提示词：

1. 主体：黑白毛发的卡通小狗（头顶粉色小装饰，呆萌探头）；下方多只卡通宠物爪印、小狗头（粉、白、棕白等，活泼互动）。动作：小狗前爪搭在粉色域边缘张望；下方元素呈欢快互动感。背景：上半部分浅粉色丝绸质感（带光泽），下半部分深粉色块；左上角 "PawJoy × HappyPet"，右侧黄色门票形标签 "门票免费领"，旁有 "现场还有趣味小礼物"，下方 "9.1 - 9.5"，黄色框 "北京宠物乐园中心"。细节氛围：粉、黄、黑为主色调，光线柔和有光泽；整体活泼有邀请感，是萌宠派对宣传海报。

2. 主体：浅灰砖块小屋（屋顶有巨型粉色发光骨头〈带白星〉、生肉排、草莓蛋糕）；小屋正面发光 "宠物嘉年华"；周围有棕爪印路灯、绿卡通树、汉堡、白骨头模型。动作：小屋静立，周围元素营造嘉年华热闹感。背景：夜晚城市（紫色天空绽粉白烟花，远处楼房亮灯）；左上角 "2024 Pet Carnival 10.1 - 10.5 Pet Park Hall"，右侧巨型 "Pet Carnival"，下方 "Pet Fun Cute Pets"。细节氛围：粉、紫、绿等鲜艳色彩，灯光温暖，烟花添欢乐；整体梦幻热闹，是宠物嘉年华夜间场景。

3. 主体：三只卡通宠物（左：浅米色卷毛小狗，站立；中：白猫咪，团身趴卧、闭眼微笑；右：浅棕带灰纹小狗，站立）。动作：小狗或站或望，猫咪慵懒趴卧，整体悠闲。背景：深绿色草地纹理（带深绿草叶）；左上角 "翳海宠 ×"，中间白框深绿字 "爱生活 萌宠趣玩"，旁白气泡框 "猫狗撒欢"，左侧 "2024.6.1 - 6.7"，下方隐现 "GROW BRAND" 等英文。细节氛围：绿、米、棕为主色调，简洁清新；传递轻松、亲近自然的萌宠活动感。`;

  export const PRODUCT_POSTER_TIPS = `推荐提示词：

1. 商业级产品摄影作品,杰作,质量最好,这是一张笔记本电脑的高分辨率照片,笔记本屏幕显示开机画面场景,笔记本电脑放置在水上的黑色岩石,超大行星背景,宇宙空间,科幻,低视角,产品摄影,现实

2. 商业级质感的居家场景，深棕色木质圆形餐桌（木纹细腻、温润有质感），桌上放置一台银色便携式照片打印机（机身带精致竖条纹理，金属质感细腻且充满科技感），打印机正打印一张色彩绚丽的风景照；周围散落三张打印好的照片，分别呈现盛放的花卉、精致的美食、手捧的花束（照片色彩饱满、画质清晰、细节生动）；画面右上角点缀几朵明黄色鲜花，增添生机。整体光线柔和温暖，光影层次分明，营造出温馨且高级的氛围，全画面细节精致，凸显产品的高品质商业展示感

3. ${DEFAULT_PROMPTS.productPoster}`;

  export const XIAOHONGSU_POSTER_TIPS = `推荐提示词：

1. ${DEFAULT_PROMPTS.xiaohongshuPoster}

2. 美食节宣传海报,卡通青年围坐餐桌,桌上有披萨,cake,咖啡和饮品,周围漂浮气球和彩带,背景是温暖橙色灯光,主标题"美味共享 快乐相聚",副标语"FOOD FESTIVAL""享受美食 享受生活""味蕾狂欢 幸福满满",整体风格活泼明快,色彩鲜艳,扁平插画,设计感突出

3. 艺术绘画展宣传海报，卡通学生手持画笔作画，周围漂浮颜料、画笔、画架、调色盘，背景明亮温暖，有渐变彩色光晕，主标题"色彩的世界 梦想的画布"，副标语"ART FESTIVAL""让创意自由飞翔"，整体风格活泼明快，色彩鲜艳，扁平插画，设计感突出`;
}
