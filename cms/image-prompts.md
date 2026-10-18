# Промты для картинок сайта

Генерировать на английском — все модели понимают его заметно лучше.
Общий стиль взят с макета клиента: светло, прохладно, клинически, без драмы.

---

## Общая часть (добавлять к каждому промту плиток)

```
Style: clean modern medical photography, soft diffused studio light,
very light cool background (near-white with a faint blue tint, #EFF4FA),
no dark corners, no vignette, airy negative space, shallow depth of field,
calm and reassuring mood, high detail, photorealistic.
```

**Negative prompt (во все):**

```
text, letters, words, numbers, logo, watermark, signage, brand names,
dark background, heavy vignette, dramatic shadows, blood, wounds,
distress, gore, distorted hands, extra fingers, oversaturated colors
```

### Технические требования

| параметр | значение | почему |
|---|---|---|
| Пропорции плиток | **1:1** (квадрат) | в карточке показывается квадратный кроп |
| Размер | 1024×1024 и больше | потом ужимаем до 700×700 |
| Композиция | объект **чуть правее центра**, левая треть пустая и светлая | левый край кадра растворяется маской — там не должно быть ничего важного и ничего тёмного |
| Фон | равномерный светлый | тёмный угол при растушёвке даёт грязное пятно |

Последний пункт — самый важный. Маска гасит левую часть снимка до нуля; если
там тёмный объект, он проступит серым пятном на белом фоне карточки.

---

## Плитки направлений (8 шт., 1:1)

### 1. `tile-oncology.webp` — Онкология

```
A calm middle-aged woman wearing a soft white headscarf, gentle smile,
looking slightly off-camera, seated near a bright window in a modern clinic,
warm natural skin tones, soft pink accent in the fabric,
clean white and pale blue surroundings, hopeful and dignified mood.
```

### 2. `tile-neurosurgery.webp` — Нейрохирургия

```
A translucent 3D medical render of a human brain, soft blue and white tones,
glowing subtle neural pathways, floating on a clean very light background,
precise anatomical detail, medical visualization style, studio lighting.
```

### 3. `tile-cardiology.webp` — Кардиология

```
A detailed anatomical 3D render of a human heart, muted coral and deep red
tones with cool blue rim light, floating on a very light background,
clean medical visualization, soft reflections, precise anatomy.
```

### 4. `tile-orthopedic.webp` — Ортопедия

```
A clean 3D medical render of a human knee joint showing bone and cartilage,
pearl white and pale blue tones, soft orange accent highlight,
floating on a very light background, anatomical accuracy,
medical illustration style, soft studio lighting.
```

### 5. `tile-urology.webp` — Урология

```
A 3D medical render of a pair of human kidneys, soft teal and sky blue tones,
subtle translucent surface, floating on a very light background,
clean anatomical visualization, soft gradient lighting.
```

### 6. `tile-gynecology.webp` — Гинекология

```
A young woman in a bright modern consulting room talking with a female doctor
in a white coat, both relaxed and attentive, soft daylight from a large window,
pale blue and white interior, warm skin tones, calm trusting atmosphere,
shallow depth of field.
```

### 7. `tile-diagnostics.webp` — Диагностика

```
A modern white MRI scanner in a bright clean radiology room,
soft blue LED accent light inside the bore, polished floor, no people,
wide clean composition, cool white and pale blue palette, pristine and calm.
```

### 8. `tile-other.webp` — Другие направления

```
A friendly doctor in a white coat with a stethoscope sitting at a desk in a
bright modern office, listening attentively, laptop and plant softly blurred
in the background, large window with daylight, white and pale blue interior,
warm professional atmosphere.
```

---

## Первый экран — `hero-building.webp` (пропорции 2.3:1, от 1800px по ширине)

**Сначала прочитай оговорку ниже.**

```
Exterior of a large modern private hospital, glass curtain wall with white
and light grey panels, clean contemporary architecture, low angle view,
clear blue sky with soft clouds, palm trees and green landscaping in front,
bright midday sunlight, professional architectural photography, wide shot,
no signage, no text on the building.
```

> **Оговорка.** Сейчас в первом экране стоит настоящая фотография корпуса
> Ассуты в Тель-Авиве с Викимедиа. Сгенерированное здание — это не Ассута.
> Поставить его под заголовком «Ведущий частный медицинский центр Израиля»
> значит показать посетителю выдуманный корпус как настоящий, а для
> медицинского сайта это прямой обман. Тем более нельзя дорисовывать на нём
> вывеску «ASSUTA».
>
> Варианты по убыванию честности: оставить фото с Викимедиа (работает сейчас) →
> попросить настоящую съёмку у клиники → поставить сгенерированное здание
> **без вывески** и не подписывать его как здание Ассуты.

---

## Баннер «Второе мнение» — `second-opinion.webp` (16:9, от 1400px)

```
Two doctors in white coats reviewing a medical scan on a large monitor in a
bright modern office, one pointing at the screen, both focused and calm,
soft daylight, white and pale blue interior, shallow depth of field,
professional and reassuring mood, space on the left for text overlay.
```

---

## Картинка к статье про жизнь в Израиле — `news-israel.webp` (16:9, от 1400px)

```
A lively Tel Aviv street on a sunny day, people walking and cycling,
mediterranean architecture with balconies and greenery, modern towers in the
background, palm trees, bright natural daylight, warm optimistic atmosphere,
documentary street photography, no text, no signage.
```

---

## Портреты к отзывам — **не генерировать**

В карточке отзыва есть поле «фото пациента». Подставлять туда
сгенерированное лицо нельзя: отзывы в базе настоящие, и выдуманный портрет
рядом с чужими словами выдаёт несуществующего человека за реального
пациента. Либо настоящее фото с письменного согласия пациента, либо
кружок с буквой — он там сейчас и стоит.

---

## Куда класть готовые файлы

Плитки, первый экран и баннер — в `public/images/`, имена **ровно** как в
таблицах выше, иначе код их не найдёт. Картинку к статье — не в проект, а в
Студию Sanity, в поле «Изображение» у этой новости.

Перед укладкой ужать: плитки до 700×700, широкие до 1400–1800px по ширине,
сохранить в webp с качеством около 0.82. Иначе в репозиторий уедут файлы по
полтора мегабайта вместо 20–60 КБ.
