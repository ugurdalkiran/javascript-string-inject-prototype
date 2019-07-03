# JavaScript String Inject Prototype

* String içine yazılabilen {{ ... }} ifadeler ile dinamik templateler oluşturulabilir.
* Template içine yazılan dinamik alanları parametredeki alanlar ile değiştirir.
* Template içine birden çok bölüm yazılabilir ve her bölüm ayrı hesap yapabilir.

## Örnekler

```js
'Merhaba {{ name }}'.inject({ name: 'Yusuf' });
// Çıktı: Merhaba Yusuf

'Google için url: <a href="{{ url }}>{{ title }}</a>'.inject({ url:'google.com', title: 'Google' });
// Çıktı: Google için url: <a href="google.com>Google</a>

'Toplam: {{ cost + profit }}'.inject({ cost: 10, profit: 3 });
// Çıktı: Toplam: 13

'İsim: {{ firstName }}, Soyisim: {{ lastName }}'.inject({ firstName: 'Yusuf', lastName: 'Oğuz' });
// Çıktı: İsim: Yusuf, Soyisim: Oğuz

'Toplam: {{ a }} + {{ b }}'.inject({ a: 1, b: 2 });
// Çıktı: Toplam: 1 + 2

'Toplam: {{ a }} + {{ b }} = {{ sum(a, b) }}'.inject({ a: 1, b: 2, sum: (a, b) => a + b });
// Çıktı: Toplam: 1 + 2 = 3

'Çarpım: {{ num1 }} * {{ num2 }} = {{ carpim(num1, num2) }}'.inject({ num1: 5, num2: 6, carpim: (num1, num2) => num1 * num2 });
// Çıktı: Çarpım: 5 * 6 = 30
```

## Faydalı RegExp İfadeleri

```js
.match(/{{(.*?)}}/gi);
```

**{{** ifadesi ile başlayıp **}}** ifadesi ile biten ifadeleri getirir.

```js
.match(/(\(.*?)\)/gi);
```

**((** ifadesi ile başlayıp **))** ifadesi ile biten ifadeleri getirir.

```js
.match(/\b(\w*.\w*)\b/gi);
```

Kelime ifadelerini getirir.

### RegExp İpucu

* **/i** Büyük/küçük harfe duyarlı bir arama yapar.
* **/g** İlk eşleşmeden sonra durmak yerine tüm eşleşmeleri bulur.

*Örnekler üzerinde başarılı bir şekilde bir çalışıyor fakat daha iyi noktaya gelmesi için geliştirilebilir.*
