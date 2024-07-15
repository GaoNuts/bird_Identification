# -*- coding utf-8 -*-
# Import Library
import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from PIL import Image
# GPU
device = "cuda:0" if torch.cuda.is_available() else "cpu"
# Transform
inputSize = 224
transform = {
    "test": transforms.Compose([
        transforms.Resize((inputSize, inputSize)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ]),
}
# Model
class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        self.layers = efficientnet_b0(
            weights=EfficientNet_B0_Weights.IMAGENET1K_V1
        )
        # Freeze the model here so that only the EfficientNet layers are frozen.
        self.freeze()

        self.layers.classifier[1] = nn.Sequential(
            nn.Linear(1280, 525),
            nn.LogSoftmax(1)
        )

    def forward(self, x):
        x = self.layers(x)
        return x

    def freeze(self):
        for param in self.layers.parameters():
            param.requires_grad = False

    def unfreeze(self):
        for param in self.layers.parameters():
            param.requires_grad = True


def modelbird(arr):
    model = torch.load("model.pt", map_location=device).to(device)

    image = Image.open(arr)

    # Preprocess the image.
    image = transform["test"](image)
    image = image.to(device)

    model.eval()
    output = model(image.unsqueeze(0))

    _, predicted = torch.max(output.data, 1)
    score = torch.exp(output)[0][predicted[0]] * 100
    classNames = ['布氏百灵', '粉嘴鲣鸟', '地犀鸟', '非洲戴冕鹤', '黄腹金鹃', '灰顶火雀', '蛎鹬', '斑尾弯嘴犀鸟', '厚嘴棉凫', '信天翁', '鹪鹩', '亚历山大鹦鹉', '黄嘴山鸦', '墨西哥黄喉地莺', '褐胸反嘴鹬', '美洲麻鳽', '美洲骨顶', '美洲河乌', '美洲红鹳', '北美金翅雀', '美洲隼', '鹨', '橙尾鸲莺', '知更鸟', '绿眉鸭', '紫辉林星蜂鸟', '黑翅草雁', '安第斯麦鸡', '安第斯金翅雀', '美洲蛇鹈', '小绿雀', '朱红蜂鸟', '蚁鸟', '蓝头歌雀', '白臀蜜雀', '使徒鸟', '阿拉里皮娇鹟', '灰叉尾海燕', '灰喉鸦雀', '朱鹮', '亚洲三宝鸟', '绿喉蜂虎', '钳嘴鹳', '奥岛鸬鹚', '安第斯卡纳灶鸟', '澳洲无花果鸟', '莓莺', '奇克针尾雀', '蓝胸八色鸫', '青蓝鸦', '蓝腰唐加拉雀', '灰蓝山雀',
                '花脸鸭', '白头雕', '秃鹮', '巴厘岛八哥', '橙腹拟鹂', '曲嘴森莺', '斑尾冠雉', '带斑阔嘴鸟', '蓝尾八色鸫', '斑长脚鹬', '斑尾塍鹬', '仓鸮', '家燕', '横斑蓬头䴕', '巴氏鹊鸭', '栗胸林莺', '胡须啄木鸟', '须钟伞鸟', '文须雀', '白腹鱼狗', '辉风鸟', '黑黄阔嘴鸟', '黑冠鹃隼', '黑胸蓬头䴕', '黑凤头鹦鹉', '黑脸琵鹭', '黑鹧鸪', '黑头凯克鹦鹉', '黑颈长脚鹬', '黑剪嘴鸥', '黑天鹅', '秧鸡', '红头长尾山雀', '黑喉隐窜鸟', '黑喉蓝林莺', '黑腹鹱', '黑美洲鹫', '黑顶山雀', '黑颈鸊鷉', '黑喉漠鹀', '橙胸林莺', '淡黄冠啄木鸟', '血雉', ' 大犀鹃', '蓝锥嘴雀', '灰蓝蚋莺', '蓝蜡嘴鸟', '松鸡', '蓝色苍鹭', '黄嘴鹃', '蓝喉鸣冠雉', '蓝喉巨嘴鸟', '食米鸟', '棘头鵙', '婆罗洲叶鹎', '加里曼丹孔雀雉', '加州鸬鹚', '蓝头黑鹂', '褐胸噪鹛', '褐头牛鹂', '白顶玄鸥', '褐弯嘴嘲鸫', '红头鹊鸭', '鳞背鹇', '布氏走鸻', '丛林火鸡', 
                '棕巨灶鸫', '黄腹角雉', '棕曲嘴鹪鹩', '加州秃鹰', '加州鸥', '加利福尼亚鹑', '草原扑翅鴷', '金丝雀', '帆背潜鸭', '红肩丽椋鸟', '橙喉长爪鹡鸰', '栗颊林莺', '南非矶鸫', '蓝嘴黑顶鹭', '三色伞鸟', '红蜂虎', '红嘴巨鸥', '鹤鸵', '雪松太平鸟', '蓝林莺', '松鸦', '噪鹦鹉', '栗腹歌雀', '红翅凤头鹃', '灰胸竹鸡', '池鹭', '棕顶雀鹀', '智利窜鸟', '石鸡', '桂红阿蒂霸鹟', '桂红霸鹟', '桂红鸭', '克氏䴙䴘', '克拉克灰鸟', '伞鸟', '凤头鹦鹉', '领簇舌巨嘴鸟', '领月胸窜鸟', '火冠戴菊', '普通拟八哥', '白腹毛脚燕', '黑翅雀鹎', '普通潜鸟', '北美小夜鹰', '紫翅椋鸟', '赤胸拟啄木鸟', '铜尾鸦鹃', '蟹鸻', '鹤鹰', '乳白啄木鸟', '凤头海雀', '凤头卡拉鹰', '凤头马岛鹃', '凤冠火背鹇', '留鸟', '红胸侏秧鸡', '发冠拟椋鸟', '蛇雕', '鵙雀鹟', '刺头鹃鸟', '绯红澳鵖', '黄腰太阳鸟', '乌鸦', '杂色短尾鴗', '古巴咬鹃', '曲冠簇舌巨嘴鸟', 
                '东非拟鴷', '卷羽鹈鹕', '黄颈啄木鸟', '黑眼灯草雀', '北红尾鸲', '蓑羽鹤', '双斑草雀', '双冠鸬鹚', '红脸果鹦鹉', '绒毛啄木鸟', '黑腹滨鹬', '烟色鹦鹉', '暗色鸲鹟', 
                '双辫八色鸫', '东蓝鸲', '蓝帽鹦鹉', '东非织巢鸟', '东草地鹨', '澳东玫瑰鹦鹉', '东部红眼雀', '三声夜鹰', '黄鸲鹟', '紫巾山蜂鸟', '埃及雁', '铜尾美洲咬鹃', '白颈长尾雉', '翠绿唐加拉雀', '帝企鹅', '食火鸟', '恩加鹩哥', '红腹灰雀', '金黄鹂', '欧亚喜鹊', '红额金翅雀', '欧斑鸠', '黄昏锡嘴雀', 
                '蓝腹和平鸟', '小蓝企鹅', '燕鸥仙', '红翅黑鹂', 'Fasciated Wren', 'Fiery Minivet', 'Fiordland Penguin', 'Fire Tailled Myzornis', 'Flame Bowerbird', 'Flame Tanager', 'Forest Wagtail', 'Frigate', 'Frill Back Pigeon', 
                '黑腹翎鹑', '红冠灰凤头鹦鹉', '吉拉啄木鸟', '黄扑翅䴕', '彩鹮', '灰蕉鹃', '金翅虫森莺', '金亭鸟', '金颊黑背林莺', '金眉绿雀', '金雕', '金色锥尾鹦鹉', '红腹锦鸡', '金鹨', '七彩文鸟', '蓝大翅鸲', '灰嘲鸫', '灰王霸鹟', '灰山鹑', '大眼斑雉', '乌林鸮', '大鹟䴕', '大食蝇霸鹟', '大林鸱', '共鸟', '大弯嘴雀', '大绿霸鹟', '草原松鸡', '艾草松鸡', '绿阔嘴鸟', '绿蓝鸦', '绿鹊', '绿翅金鸠', '灰鹃鵙', '灰头小冠雉', '灰头鱼雕', '灰斑鸻', '沟嘴犀鹃', '绿冠蕉鹃', '鹫珠鸡', '泰国八色鸫', '矛隼', 
                '锤头鹳', '丑鸭', '花脸鹌鹑', '角雕', '夏威夷黑雁', '锡嘴雀', 'Helmet Vanga', 'Hepatic Tanager', '蓝眉林鸲', '棕尾虹雉', '麝雉', '棕胁秋沙鸭', '戴胜', '角冠雉', '角百灵', '角蜂鸟', '家朱雀', '织巢鸟', '紫蓝金刚鹦鹉', 
                'Iberian Magpie', '鹮嘴鹬', 'Imperial Shaq', '印加燕鸥', 'Indian Bustard', 'Indian Pitta', 'Indian Roller', 'Indian Vulture', 'Indigo Bunting', 'Indigo Flycatcher', 'Inland Dotterel', 'Ivory Billed Aracari', 'Ivory Gull', 'Iwi', 
                'Jabiru', 'Jack Snipe', 'Jacobin Pigeon', 'Jandaya Parakeet', 'Japanese Robin', 'Java Sparrow', 'Jocotoco Antpitta', 'Kagu', 'Kakapo', 'Killdear', 'King Eider', 'King Vulture', 'Kiwi', 'Knob Billed Duck', 'Kookaburra', 
                'Lark Bunting', 'Laughing Gull', 'Lazuli Bunting', 'Lesser Adjutant', 'Lilac Roller', 'Limpkin', 'Little Auk', 'Loggerhead Shrike', 'Long-Eared Owl', '该图像为人类', 'Lucifer Hummingbird', 
                'Magpie Goose', 'Malabar Hornbill', 'Malachite Kingfisher', 'Malagasy White Eye', '马利奥冢雉', 'Mallard Duck', 'Mandrin Duck', 'Mangrove Cuckoo', 'Marabou Stork', 'Masked Bobwhite', 'Masked Booby', 'Masked Lapwing', 'Mckays Bunting', 'Merlin', 'Mikado  Pheasant', 'Military Macaw', 'Mourning Dove', 'Myna', 
                'Nicobar Pigeon', 'Noisy Friarbird', 'Northern Beardless Tyrannulet', 'Northern Cardinal', 'Northern Flicker', 'Northern Fulmar', 'Northern Gannet', 'Northern Goshawk', 'Northern Jacana', 'Northern Mockingbird', 'Northern Parula', 'Northern Red Bishop', 'Northern Shoveler', 
                '眼斑火鸡', 'Oilbird', 'Okinawa Rail', 'Orange Breasted Trogon', 'Orange Brested Bunting', 'Oriental Bay Owl', 'Ornate Hawk Eagle', 'Osprey', 'Ostrich', 'Ovenbird', 'Oyster Catcher', 
                '丽彩鹀', 'Palila', '棕榈鹫', 'Paradise Tanager', 'Parakett  Auklet', 'Parus Major', '黑岭雀鹀', 'Peacock', 'Peregrine Falcon', 'Phainopepla', 'Philippine Eagle', 'Pink Robin', 'Plush Crested Jay', 'Pomarine Jaeger', 'Puffin', 'Puna Teal', 'Purple Finch', 'Purple Gallinule', 'Purple Martin', 'Purple Swamphen', 'Pygmy Kingfisher', 'Pyrrhuloxia', 
                'Quetzal', 
                '彩虹鹦鹉', '海雀', '赤须夜蜂虎', '红胸八色鸫', '红嘴鹲', '红眉火尾雀', '红交嘴雀', '红脸鸬鹚', '红脸假森莺', '红织雀', '红头潜鸭', '红头啄木鸟', '红腹滨鹬', '红脚旋蜜雀', '红枕咬鹃', '赤肩鵟', '红尾鵟', '赤尾噪鹛', '红翅黑鹂', '红耳鹎', '黄头辉亭鸟', '环颈雉', '走鹃', '原鸽', '粉红葵花鹦鹉', '玫胸白斑翅雀', '粉红琵鹭', '桃脸牡丹鹦鹉', '毛脚鵟', '皇霸鹟', '红玉冠戴菊鸟', '红喉北蜂鸟', '赤麻鸭', '赤翡翠', '棕背三趾翠鸟', '棕腹树鹊', '棕翠鴗', 
                '白冠噪鹛', '崖沙燕', '沙丘鹤', '红胸角雉', '棕腹长尾霸鹟', '粉顶果鸠', '红翅薮鹛', '红鹮', '红黄金刚鹦鹉', '猩红丽唐纳雀', '鲸头鹳', '短嘴半蹼鹬', '黄腹铁爪鹀', '雪雁', '雪鹑', '雪鹭', '雪鸮', '雪鸻', '白鞘嘴鸥', '黑脸田鸡', '辉伞鸟', '辉蓝细尾鹩莺', '勺嘴鹬', '点斑园丁鸟', '细斑树鸭', '白翅黄池鹭', '斯里兰卡蓝鹊', '船鸭', '鹳嘴翡翠', '红腿巨隼', '纹鸮', '西条纹娇鹟', '小纹燕', '日鳽', '栗头丽椋鸟', '斑头海番鸭', '蓝鹇', 
                'Tailorbird', 'Taiwan Magpie', 'Takahe', 'Tasmanian Hen', 'Tawny Frogmouth', 'Teal Duck', 'Tit Mouse', 'Touchan', '黄眉林莺', '双色树燕', '三色黑鹂', '热带王霸鹟', '黑嘴天鹅', '土耳其秃鹰', 'Turquoise Motmot', 
                'Umbrella Bird', 
                '杂色鸫', '画眉鸟', 'Venezuelian Troupial', '黄头金雀', '朱红霸鹟', '维多凤冠鸠', '白腹紫椋鸟', '紫金鹃', '紫绿树燕', 'Violet Turaco', 'Visayan Hornbill', '鹫珠鸡', 
                '红翅旋壁雀', '肉垂凤冠雉', '黑喉肉垂麦鸡', '杓鹬', '白胸苦恶鸟', '白眉田鸡', '白颊蕉鹃', '白冠弯嘴犀鸟', '白耳蜂鸟', '白颈渡鸦', '白尾鹲', '白喉蜂虎', '火鸡', '柳雷鸟', '威氏极乐鸟', '林鸳鸯', '画眉鸟', '林地翡翠', '鹪雀鹛', 
                '黄喉锯齿啄花鸟', '黄胸大䳭莺', '黄嘴酋长鹂', '黄头黑鹂', 
                '斑姬地鸠']
    
    print(f'{classNames[predicted[0]]}, {score: .2f}')
    # score = f'{score: .2f}'
    # print(score)
    # if (score <= 0.5): 
    #     print('该图像非鸟类或者图像模糊，请重新上传')
    # else:
    #     print(classNames[predicted[0]])




import sys

arr = sys.argv[1]

val = modelbird(arr)