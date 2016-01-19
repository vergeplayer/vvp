字幕 Tracks
======

通过视频的时间轨道触发了字幕的功能，vvp.js提供了一个夸浏览器兼容的字幕功能，当前有五种字幕类型:

- **字幕 Subtitles**: 根据视频中音频对话，给予文字注解或翻译，展示在视频上。
- **标题 Captions**: 当视频使用者有对视频内容的需求或是有听力等其他障碍时，视频当中的对话、音效、音乐加以文字的说明，将该说明展示在视频上。
- **章节 Chapters**: 章节用来做为视频的导航，通过章节的列表的点击，可以切换章节。
- **描述 Descriptions** (暂不支持)
- **元数据 Metadata** (暂不支持): 元数据是由Javascript进行跟踪解析，这部分不展示给用户。

创建字幕文件
----------------------
时间轴字幕文件需要使用WebVTT格式来表示 [WebVTT](http://dev.w3.org/html5/webvtt/)。 该格式包含一个列表包含视频的开始时间、结束时间和需要显示的文本。微软时这个格式的提供者，点击这里可以帮助你开始学习这个格式[Microsoft has a builder](http://ie.microsoft.com/testdrive/Graphics/CaptionMaker/)。

当创建字幕文件时晴参考该技术文档， [caption formatting techniques] (http://www.theneitherworld.com/mcpoodle/SCC_TOOLS/DOCS/SCC_FORMAT.HTML#style)如果你想深入了解相关的技术细节请参看以下链接  [Captioning Key](http://www.dcmp.org/captioningkey/), 但是以上技术细节不是所有特性都支持WebVTT格式。

向vvp.js添加字幕
------------------
如果你创建了一个WebVTT格式的文件，你就可以向vvp.js添加到视频中。使用 track 标签放置到video标签内，然后设置好文件的src和一些必要的参数。

```html
<video id="example_video_1" class="video-js vjs-default-skin"  
  controls preload="auto" width="640" height="264"  
  data-setup='{"example_option":true}'>  
 <source src="http://example.com/oceans-clip.mp4" type='video/mp4' />  
 <source src="http://example.com/oceans-clip.webm" type='video/webm' />  
 <source src="http://examplecom/oceans-clip.ogv" type='video/ogg' />  

 <track kind="captions" src="http://example.com/path/to/captions.vtt" srclang="en" label="English" default>

</video>
```

使用其他域下的字幕
-----------------------------
因为我们通过Javascript来获得字幕文件，受限于Javascript的同源策略[same-origin policy](http://en.wikipedia.org/wiki/Same_origin_policy) 如果你想跨域获取字幕文件，你就需要进行相关的操作
 [enable CORS](http://enable-cors.org/)。

字幕轨道属性
----------------
为track标签添加相关设置

### kind
五种轨道类型之一，如果没有值，类型默认为字幕。

### label
该属性将现实给用户，比如，在一个菜单中，列出了不同的语言可用于选择的字幕。

### default
默认属性用来跟踪默认的值，否则视频使用者需要选择自己的语言字幕菜单。
注: 对于章节，如果你想让章节菜单显示，该值是必须的

### srclang
两个字母的代码（有效的BCP 47语言标记）的文本轨道的语言，例如“en”的英文。这里有一个可用的语言代码列表。

<table border="0" cellspacing="5" cellpadding="5">
  <tr>
    <td>

      <table>
        <tr><th>ab<th><td>Abkhazian</td></tr>
        <tr><th>aa<th><td>Afar</td></tr>
        <tr><th>af<th><td>Afrikaans</td></tr>
        <tr><th>sq<th><td>Albanian</td></tr>
        <tr><th>am<th><td>Amharic</td></tr>
        <tr><th>ar<th><td>Arabic</td></tr>
        <tr><th>an<th><td>Aragonese</td></tr>
        <tr><th>hy<th><td>Armenian</td></tr>
        <tr><th>as<th><td>Assamese</td></tr>
        <tr><th>ay<th><td>Aymara</td></tr>
        <tr><th>az<th><td>Azerbaijani</td></tr>
        <tr><th>ba<th><td>Bashkir</td></tr>
        <tr><th>eu<th><td>Basque</td></tr>
        <tr><th>bn<th><td>Bengali (Bangla)</td></tr>
        <tr><th>dz<th><td>Bhutani</td></tr>
        <tr><th>bh<th><td>Bihari</td></tr>
        <tr><th>bi<th><td>Bislama</td></tr>
        <tr><th>br<th><td>Breton</td></tr>
        <tr><th>bg<th><td>Bulgarian</td></tr>
        <tr><th>my<th><td>Burmese</td></tr>
        <tr><th>be<th><td>Byelorussian (Belarusian)</td></tr>
        <tr><th>km<th><td>Cambodian</td></tr>
        <tr><th>ca<th><td>Catalan</td></tr>
        <tr><th>zh<th><td>Chinese (Simplified)</td></tr>
        <tr><th>zh<th><td>Chinese (Traditional)</td></tr>
        <tr><th>co<th><td>Corsican</td></tr>
        <tr><th>hr<th><td>Croatian</td></tr>
        <tr><th>cs<th><td>Czech</td></tr>
        <tr><th>da<th><td>Danish</td></tr>
        <tr><th>nl<th><td>Dutch</td></tr>
        <tr><th>en<th><td>English</td></tr>
        <tr><th>eo<th><td>Esperanto</td></tr>
        <tr><th>et<th><td>Estonian</td></tr>
        <tr><th>fo<th><td>Faeroese</td></tr>
        <tr><th>fa<th><td>Farsi</td></tr>
        <tr><th>fj<th><td>Fiji</td></tr>
        <tr><th>fi<th><td>Finnish</td></tr>
      </table>

    </td>
    <td>

      <table>
        <tr><th>fr<th><td>French</td></tr>
        <tr><th>fy<th><td>Frisian</td></tr>
        <tr><th>gl<th><td>Galician</td></tr>
        <tr><th>gd<th><td>Gaelic (Scottish)</td></tr>
        <tr><th>gv<th><td>Gaelic (Manx)</td></tr>
        <tr><th>ka<th><td>Georgian</td></tr>
        <tr><th>de<th><td>German</td></tr>
        <tr><th>el<th><td>Greek</td></tr>
        <tr><th>kl<th><td>Greenlandic</td></tr>
        <tr><th>gn<th><td>Guarani</td></tr>
        <tr><th>gu<th><td>Gujarati</td></tr>
        <tr><th>ht<th><td>Haitian Creole</td></tr>
        <tr><th>ha<th><td>Hausa</td></tr>
        <tr><th>he<th><td>Hebrew</td></tr>
        <tr><th>hi<th><td>Hindi</td></tr>
        <tr><th>hu<th><td>Hungarian</td></tr>
        <tr><th>is<th><td>Icelandic</td></tr>
        <tr><th>io<th><td>Ido</td></tr>
        <tr><th>id<th><td>Indonesian</td></tr>
        <tr><th>ia<th><td>Interlingua</td></tr>
        <tr><th>ie<th><td>Interlingue</td></tr>
        <tr><th>iu<th><td>Inuktitut</td></tr>
        <tr><th>ik<th><td>Inupiak</td></tr>
        <tr><th>ga<th><td>Irish</td></tr>
        <tr><th>it<th><td>Italian</td></tr>
        <tr><th>ja<th><td>Japanese</td></tr>
        <tr><th>jv<th><td>Javanese</td></tr>
        <tr><th>kn<th><td>Kannada</td></tr>
        <tr><th>ks<th><td>Kashmiri</td></tr>
        <tr><th>kk<th><td>Kazakh</td></tr>
        <tr><th>rw<th><td>Kinyarwanda (Ruanda)</td></tr>
        <tr><th>ky<th><td>Kirghiz</td></tr>
        <tr><th>rn<th><td>Kirundi (Rundi)</td></tr>
        <tr><th>ko<th><td>Korean</td></tr>
        <tr><th>ku<th><td>Kurdish</td></tr>
        <tr><th>lo<th><td>Laothian</td></tr>
        <tr><th>la<th><td>Latin</td></tr>
      </table>

    </td>
    <td>

      <table>
        <tr><th>lv<th><td>Latvian (Lettish)</td></tr>
        <tr><th>li<th><td>Limburgish ( Limburger)</td></tr>
        <tr><th>ln<th><td>Lingala</td></tr>
        <tr><th>lt<th><td>Lithuanian</td></tr>
        <tr><th>mk<th><td>Macedonian</td></tr>
        <tr><th>mg<th><td>Malagasy</td></tr>
        <tr><th>ms<th><td>Malay</td></tr>
        <tr><th>ml<th><td>Malayalam</td></tr>
        <tr><th>mt<th><td>Maltese</td></tr>
        <tr><th>mi<th><td>Maori</td></tr>
        <tr><th>mr<th><td>Marathi</td></tr>
        <tr><th>mo<th><td>Moldavian</td></tr>
        <tr><th>mn<th><td>Mongolian</td></tr>
        <tr><th>na<th><td>Nauru</td></tr>
        <tr><th>ne<th><td>Nepali</td></tr>
        <tr><th>no<th><td>Norwegian</td></tr>
        <tr><th>oc<th><td>Occitan</td></tr>
        <tr><th>or<th><td>Oriya</td></tr>
        <tr><th>om<th><td>Oromo (Afan, Galla)</td></tr>
        <tr><th>ps<th><td>Pashto (Pushto)</td></tr>
        <tr><th>pl<th><td>Polish</td></tr>
        <tr><th>pt<th><td>Portuguese</td></tr>
        <tr><th>pa<th><td>Punjabi</td></tr>
        <tr><th>qu<th><td>Quechua</td></tr>
        <tr><th>rm<th><td>Rhaeto-Romance</td></tr>
        <tr><th>ro<th><td>Romanian</td></tr>
        <tr><th>ru<th><td>Russian</td></tr>
        <tr><th>sm<th><td>Samoan</td></tr>
        <tr><th>sg<th><td>Sangro</td></tr>
        <tr><th>sa<th><td>Sanskrit</td></tr>
        <tr><th>sr<th><td>Serbian</td></tr>
        <tr><th>sh<th><td>Serbo-Croatian</td></tr>
        <tr><th>st<th><td>Sesotho</td></tr>
        <tr><th>tn<th><td>Setswana</td></tr>
        <tr><th>sn<th><td>Shona</td></tr>
        <tr><th>ii<th><td>Sichuan Yi</td></tr>
        <tr><th>sd<th><td>Sindhi</td></tr>
      </table>

    </td>
    <td>

      <table>
        <tr><th>si<th><td>Sinhalese</td></tr>
        <tr><th>ss<th><td>Siswati</td></tr>
        <tr><th>sk<th><td>Slovak</td></tr>
        <tr><th>sl<th><td>Slovenian</td></tr>
        <tr><th>so<th><td>Somali</td></tr>
        <tr><th>es<th><td>Spanish</td></tr>
        <tr><th>su<th><td>Sundanese</td></tr>
        <tr><th>sw<th><td>Swahili (Kiswahili)</td></tr>
        <tr><th>sv<th><td>Swedish</td></tr>
        <tr><th>tl<th><td>Tagalog</td></tr>
        <tr><th>tg<th><td>Tajik</td></tr>
        <tr><th>ta<th><td>Tamil</td></tr>
        <tr><th>tt<th><td>Tatar</td></tr>
        <tr><th>te<th><td>Telugu</td></tr>
        <tr><th>th<th><td>Thai</td></tr>
        <tr><th>bo<th><td>Tibetan</td></tr>
        <tr><th>ti<th><td>Tigrinya</td></tr>
        <tr><th>to<th><td>Tonga</td></tr>
        <tr><th>ts<th><td>Tsonga</td></tr>
        <tr><th>tr<th><td>Turkish</td></tr>
        <tr><th>tk<th><td>Turkmen</td></tr>
        <tr><th>tw<th><td>Twi</td></tr>
        <tr><th>ug<th><td>Uighur</td></tr>
        <tr><th>uk<th><td>Ukrainian</td></tr>
        <tr><th>ur<th><td>Urdu</td></tr>
        <tr><th>uz<th><td>Uzbek</td></tr>
        <tr><th>vi<th><td>Vietnamese</td></tr>
        <tr><th>vo<th><td>Volapük</td></tr>
        <tr><th>wa<th><td>Wallon</td></tr>
        <tr><th>cy<th><td>Welsh</td></tr>
        <tr><th>wo<th><td>Wolof</td></tr>
        <tr><th>xh<th><td>Xhosa</td></tr>
        <tr><th>yi<th><td>Yiddish</td></tr>
        <tr><th>yo<th><td>Yoruba</td></tr>
        <tr><th>zu<th><td>Zulu</td></tr>
      </table>

    </td>
  </tr>
</table>