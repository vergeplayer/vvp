多语言 Languages
=========

多语言是为了支持非汉语(普通话)的用户，更方便的使用播放器服务。vvp.js实例化了一个字典通过键/值的方式来支持多语言的维护。

创建多语言文件
--------------------------
vvp.js通过一个JSON格式的列表来对照支持多语言,示例如下：

```JSON
{
  "Play": "Reproducción",
  "Pause": "Pausa",
  "Current Time": "Tiempo reproducido",
  "Duration Time": "Duración total",
  "Remaining Time": "Tiempo restante",
  "Stream Type": "Tipo de secuencia",
  "LIVE": "DIRECTO",
  "Loaded": "Cargado",
  "Progress": "Progreso",
  "Fullscreen": "Pantalla completa",
  "Non-Fullscreen": "Pantalla no completa",
  "Mute": "Silenciar",
  "Unmuted": "No silenciado",
  "Playback Rate": "Velocidad de reproducción",
  "Subtitles": "Subtítulos",
  "subtitles off": "Subtítulos desactivados",
  "Captions": "Subtítulos especiales",
  "captions off": "Subtítulos especiales desactivados",
  "Chapters": "Capítulos",
  "You aborted the video playback": "Ha interrumpido la reproducción del vídeo.",
  "A network error caused the video download to fail part-way.": "Un error de red ha interrumpido la descarga del vídeo.",
  "The video could not be loaded, either because the server or network failed or because the format is not supported.": "No se ha podido cargar el vídeo debido a un fallo de red o del servidor o porque el formato es incompatible.",
  "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.": "La reproducción de vídeo se ha interrumpido por un problema de corrupción de datos o porque el vídeo precisa funciones que su navegador no ofrece.",
  "No compatible source was found for this video.": "No se ha encontrado ninguna fuente compatible con este vídeo."
}
```

注意:

- 文件格式必须是 `XX.json`, where `XX` 文件名是两个字母的国家缩写 (具体选项请参看该文档底部列表).
- 添加语言文件到`/lang` 目录下 (任何添加参看下面文档).

添加多语言到vvp.js
----------------------------
为vvp.js添加多语言支持

1. 创建一个自定义的gulp任务 `vvplanguages`. 该任务将自动运行把符合的语言配置分发到 `src`/`dist` 目录，一旦创建了该脚本，您可以在应用中方便的使用它。

注意: 该脚本依赖 vvp.js的核心脚本才能运行。


2. 通过 vvp.lang API把该对象添加到JSON对象中，最要放置到 HEAD 标签里。

```html
<head>
<script>
  vvp.options.flash.swf = '../node_modules/vvpjs-swf/dist/video-js.swf';
  vvp.lang('es', {
    "Play": "Reproducción",
    "Pause": "Pausa",
    "Current Time": "Tiempo reproducido",
    "Duration Time": "Duración total",
    "Remaining Time": "Tiempo restante",
    "Stream Type": "Tipo de secuencia",
    "LIVE": "DIRECTO",
    "Loaded": "Cargado",
    "Progress": "Progreso",
    "Fullscreen": "Pantalla completa",
    "Non-Fullscreen": "Pantalla no completa",
    "Mute": "Silenciar",
    "Unmuted": "No silenciado",
    "Playback Rate": "Velocidad de reproducción",
    "Subtitles": "Subtítulos",
    "subtitles off": "Subtítulos desactivados",
    "Captions": "Subtítulos especiales",
    "captions off": "Subtítulos especiales desactivados",
    "Chapters": "Capítulos",
    "You aborted the video playback": "Ha interrumpido la reproducción del vídeo.",
    "A network error caused the video download to fail part-way.": "Un error de red ha interrumpido la descarga del vídeo.",
    "The video could not be loaded, either because the server or network failed or because the format is not supported.": "No se ha podido cargar el vídeo debido a un fallo de red o del servidor o porque el formato es incompatible.",
    "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.": "La reproducción de vídeo se ha interrumpido por un problema de corrupción de datos o porque el vídeo precisa funciones que su navegador no ofrece.",
    "No compatible source was found for this video.": "No se ha encontrado ninguna fuente compatible con este vídeo."
});
</script>
</head>
```

3. 当构建播放器实例时，也可以通过 `data-setup` 属性来构建。

```html
<video id="example_video_1" class="video-js vjs-default-skin"  
  controls preload="auto" width="640" height="264"  
  data-setup='{"languages":{"es":{"Play":"Juego"}}}'>  
 <source src="http://static.youku.com/player/demo.mp4" type='video/mp4' />  
 <source src="http://static.youku.com/player/demo.webm" type='video/webm' />  
 <source src="http://static.youku.com/player/demo.ogv" type='video/ogg' />  

 <track kind="captions" src="http://example.com/path/to/captions.vtt" srclang="en" label="English" default>

</video>
```

注意:
- 在配置参数中如果键/值名称和文档中的键/值名称重复，将覆盖文档中的值。


设置默认语言
---------------------------------------------
当构建播放器实例时，你也可以通过 `data-setup` 属性来强制设置播放器的默认语言。

```html
<video id="example_video_1" class="video-js vjs-default-skin"  
  controls preload="auto" width="640" height="264"  
  data-setup='{"language":"es"}'>  
 <source src="http://static.youku.com/player/demo.mp4" type='video/mp4' />  
 <source src="http://static.youku.com/player/demo.webm" type='video/webm' />  
 <source src="http://static.youku.com/player/demo.ogv" type='video/ogg' />  

 <track kind="captions" src="http://example.com/path/to/captions.vtt" srclang="en" label="English" default>

</video>
```

多语言插件
-----------------------

当你开发插件时候，你可以添加你所需要的多语言对照。可以通过 `localize` 方法来设置:

```javascript
var details = '<div class="vjs-errors-details">' + player.localize('Technical details') + '</div>';
```

语言对照代码
--------------
下表列举了官方的语言缩写代码

**注意:** 更多详细的语言文档请参看 [Languages Folder (/lang)](../../lang)。

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
