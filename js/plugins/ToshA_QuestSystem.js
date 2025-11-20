/*:
 * @target MZ
 * @plugindesc v0.3.0 Полнофункциональная система квестов с журналом, категориями и уведомлениями
 * @author ToshaAngel
 * @url https://boosty.to/rtlk
 *
 * @help ToshA_QuestSystem.js
 * ============================================================================
 * ПОЛНОЕ РУКОВОДСТВО ПО ИСПОЛЬЗОВАНИЮ
 * ============================================================================
 * 
 * Полнофункциональная система квестов для RPG Maker MZ с автоматическим
 * отслеживанием прогресса, умными уведомлениями и гибкой настройкой.
 * 
 * ============================================================================
 * БЫСТРЫЙ СТАРТ
 * ============================================================================
 * 
 * 1. Установите плагин в папку js/plugins/
 * 2. Включите плагин в Plugin Manager
 * 3. Настройте предустановленные квесты в параметрах плагина
 * 4. В событии используйте команду "Activate Predefined Quest"
 * 5. Квест появится в журнале (меню) и на экране (трекер)
 * 
 * ============================================================================
 * ОСНОВНЫЕ ВОЗМОЖНОСТИ
 * ============================================================================
 * 
 * ✓ ПРЕДУСТАНОВЛЕННЫЕ КВЕСТЫ
 *   Настройте все квесты игры заранее в параметрах плагина
 * 
 * ✓ АВТОМАТИЧЕСКОЕ ОТСЛЕЖИВАНИЕ (IT/W/A/E)
 *   Система сама следит за предметами, оружием, бронёй и убийствами врагов
 * 
 * ✓ АВТОПРОГРЕССИЯ ЦЕЛЕЙ
 *   Цели переключаются автоматически + откат при потере предметов
 * 
 * ✓ СКРЫТЫЕ ЦЕЛИ
 *   Цели могут быть скрыты и открываться по мере прохождения
 * 
 * ✓ ТРЕКЕР НА КАРТЕ
 *   Активные квесты отображаются в углу экрана во время игры
 * 
 * ✓ ЖУРНАЛ КВЕСТОВ
 *   Полноценное меню с категориями, описаниями и наградами
 * 
 * ✓ ТРИГГЕРЫ СОБЫТИЙ
 *   Запускайте события, переключатели и переменные при выполнении
 * 
 * ✓ УВЕДОМЛЕНИЯ
 *   Всплывающие окна при выполнении целей и квестов
 * 
 * ============================================================================
 * АВТОМАТИЧЕСКОЕ ОТСЛЕЖИВАНИЕ (IT/W/A/E)
 * ============================================================================
 * 
 * Система автоматически отслеживает прогресс по специальным токенам в тексте:
 * 
 * \IT[ID] или N \IT[ID] - Предмет (Items)
 *   Пример: "Собрать 5 \IT[10] зелий"
 *   Система автоматически посчитает количество предметов ID 10
 * 
 * \W[ID] или N \W[ID] - Оружие (Weapons)
 *   Пример: "Найти 1 \W[3] меч"
 *   Отслеживает оружие ID 3 в инвентаре
 * 
 * \A[ID] или N \A[ID] - Броня (Armor)
 *   Пример: "Собрать 3 \A[5] щита"
 *   Проверяет наличие брони ID 5
 * 
 * \E[ID] или N \E[ID] - Враги (Enemies)
 *   Пример: "Убить 10 \E[2] гоблинов"
 *   Считает убийства врагов ID 2
 * 
 * ВАЖНО:
 * - Число перед токеном = требуемое количество (по умолчанию 1)
 * - В одной цели можно использовать несколько токенов
 * - Прогресс обновляется автоматически в реальном времени
 * 
 * ПРИМЕРЫ:
 *   "Собрать 5 \IT[1]" - нужно 5 предметов ID 1
 *   "Убить 3 \E[5] и собрать 2 \IT[10]" - сразу две цели
 *   "Найти \A[3]" - найти 1 броню ID 3 (число не указано = 1)
 * 
 * ============================================================================
 * АВТОПРОГРЕССИЯ ЦЕЛЕЙ (autoProgressObjectives)
 * ============================================================================
 * 
 * При включении автопрогрессии квест работает как пошаговый чек-лист:
 * 
 * КАК РАБОТАЕТ:
 * 1. Активна только ПЕРВАЯ цель
 * 2. Когда она выполнена → автоматически переключается на ВТОРУЮ
 * 3. Скрытые цели открываются автоматически при достижении
 * 4. Если потеряли предметы → система откатывается к предыдущей цели
 * 
 * ОТКАТ (Rollback):
 *   Если у цели были предметы, но вы их потеряли (продали, использовали),
 *   система вернёт вас к сбору этих предметов.
 *   НО! Откат НЕ произойдёт, если вы уже перешли дальше и предметы
 *   были использованы по квесту (например, отданы NPC).
 * 
 * ПРИМЕР КВЕСТА:
 *   Цель 1: "Собрать 4 \IT[5] зелья" (autoTracking)
 *   Цель 2: "Отнести зелья торговцу" (autoTracking, hidden)
 *   Цель 3: "Вернуться к квестодателю" (обычная цель)
 * 
 *   СЦЕНАРИЙ:
 *   - Собрали 4/4 зелья → Цель 1 выполнена → Переход на Цель 2
 *   - Цель 2 открылась (была hidden)
 *   - Потеряли 1 зелье (3/4) → ОТКАТ к Цели 1
 *   - Снова собрали 4/4 → Цель 1 выполнена → Переход на Цель 2
 *   - Отдали зелья NPC (событие забрало предметы) → Цель 2 выполнена
 *   - Переход на Цель 3 (даже если зелий нет - откат не происходит)
 * 
 * НАСТРОЙКА:
 *   В параметрах квеста включите "Автопереключение целей" (autoProgressObjectives)
 * 
 * ============================================================================
 * КОМАНДЫ ПЛАГИНА (Plugin Commands)
 * ============================================================================
 * 
 * Activate Predefined Quest
 *   Активирует предустановленный квест
 *   Параметры: Quest ID
 * 
 * Add Quest
 *   Создаёт новый квест динамически во время игры
 *   Параметры: ID, Название, Категория, Описание, Цели, Награда и т.д.
 * 
 * Update Quest Status
 *   Меняет статус квеста (available/active/completed/failed/hidden)
 *   Параметры: Quest ID, New Status
 * 
 * Complete Objective
 *   Отмечает цель как выполненную (запускает триггеры)
 *   Параметры: Quest ID, Objective ID
 * 
 * Set Objective Completed
 *   Устанавливает статус выполнения цели (true/false)
 *   Параметры: Quest ID, Objective ID, Completed (boolean)
 * 
 * Set Objective Auto Tracking
 *   Включает/выключает автоматическое отслеживание цели
 *   Параметры: Quest ID, Objective ID, Auto Tracking (boolean)
 * 
 * Add Objective
 *   Добавляет новую цель к существующему квесту
 *   Параметры: Quest ID, Objective ID, Objective Text
 * 
 * Remove Quest
 *   Удаляет квест из системы
 *   Параметры: Quest ID
 * 
 * Update Quest Field
 *   Обновляет поля квеста (название, описание, награда и т.д.)
 *   Параметры: Quest ID, Field (title/description/etc), Value
 * 
 * Open Quest Log
 *   Открывает журнал квестов
 *   Параметры: нет
 * 
 * Track Quest / Untrack Quest / Toggle Quest Tracking
 *   Управление отслеживанием квеста в трекере на карте
 *   Параметры: Quest ID
 * 
 * Set Objective Hidden
 *   Скрывает или показывает цель
 *   Параметры: Quest ID, Objective ID, Hidden (boolean)
 * 
 * ============================================================================
 * СКРИПТОВЫЕ ВЫЗОВЫ (Script Calls)
 * ============================================================================
 * 
 * QuestManager.activatePredefinedQuest("quest_001")
 *   Активирует предустановленный квест
 * 
 * QuestManager.getQuest("quest_001")
 *   Возвращает объект квеста
 * 
 * QuestManager.updateQuestStatus("quest_001", "completed")
 *   Меняет статус квеста
 * 
 * QuestManager.completeObjective("quest_001", "obj_1")
 *   Выполняет цель квеста
 * 
 * QuestManager.setObjectiveCompleted("quest_001", "obj_1", true)
 *   Устанавливает статус цели (true/false)
 * 
 * QuestManager.setObjectiveAutoTracking("quest_001", "obj_1", false)
 *   Включает/выключает автотрекинг цели
 * 
 * QuestManager.isObjectiveCompleted("quest_001", "obj_1")
 *   Проверяет выполнена ли цель (возвращает true/false)
 * 
 * QuestManager.setQuestTracked("quest_001", true)
 *   Добавляет/убирает квест из трекера
 * 
 * QuestManager.setObjectiveHidden("quest_001", "obj_1", false)
 *   Показывает/скрывает цель
 * 
 * ============================================================================
 * УСЛОВНЫЕ ПРОВЕРКИ (Conditional Branch > Script)
 * ============================================================================
 * 
 * Используйте эти функции в "Conditional Branch" → "Script":
 * 
 * $getQuestStatus('quest_001') === 'completed'
 *   Проверяет статус квеста
 *   Статусы: 'hidden', 'available', 'active', 'completed', 'failed'
 * 
 * $isObjectiveCompleted('quest_001', 'obj_1')
 *   Проверяет выполнена ли цель (возвращает true/false)
 * 
 * $checkEnemyKills('quest_001', 'obj_1', 5) >= 10
 *   Проверяет количество убийств врага ID 5 для цели
 *   Пример: "Убито ли 10+ гоблинов?"
 * 
 * $checkItemCount('quest_001', 'obj_1', 3, 'IT') >= 5
 *   Проверяет количество предметов ID 3 для цели
 *   Типы: 'IT' (предметы), 'W' (оружие), 'A' (броня)
 *   Пример: "Собрано ли 5+ зелий?"
 * 
 * $checkObjectiveProgress('quest_001', 'obj_1', 0).met
 *   Универсальная проверка прогресса
 *   targetIndex - номер токена в цели (0 = первый, 1 = второй и т.д.)
 *   Возвращает: {current: число, amount: число, met: boolean}
 * 
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ:
 *   ◆Conditional Branch: Script: $getQuestStatus('main_001') === 'completed'
 *     ◆Text: Спасибо за помощь!
 *   : Else
 *     ◆Text: Квест ещё не завершён...
 *   : Branch End
 * 
 *   ◆Conditional Branch: Script: $checkEnemyKills('hunt_quest', 'obj_1', 2) >= 5
 *     ◆Text: Ты убил достаточно волков!
 *   : Branch End
 * 
 * ============================================================================
 * ТРИГГЕРЫ СОБЫТИЙ
 * ============================================================================
 * 
 * При выполнении/провале цели или квеста можно запускать:
 * 
 * ✓ ОБЩИЕ СОБЫТИЯ (Common Events)
 *   Настройте ID события в параметрах цели/квеста
 *   Событие запустится автоматически при выполнении
 * 
 * ✓ ПЕРЕКЛЮЧАТЕЛИ (Switches)
 *   Автоматически включится указанный переключатель
 * 
 * ✓ ПЕРЕМЕННЫЕ (Variables)
 *   Операции: = (установить), + (прибавить), - (отнять)
 *   Пример: при выполнении цели +1 к переменной "Квестов выполнено"
 * 
 * НАСТРОЙКА (для целей):
 *   - onCompleteCommonEvent: ID общего события
 *   - onCompleteSwitch: ID переключателя
 *   - onCompleteVariable: ID переменной
 *   - onCompleteVariableOp: операция (set/add/sub)
 *   - onCompleteVariableValue: значение
 * 
 * НАСТРОЙКА (для квестов):
 *   - onCompleteCommonEvent/Switch/Variable/Op/Value: при завершении
 *   - onFailCommonEvent/Switch/Variable/Op/Value: при провале
 * 
 * ============================================================================
 * ПРИМЕРЫ КВЕСТОВ
 * ============================================================================
 * 
 * ПРИМЕР 1: Простой квест со сбором предметов
 *   ID: gather_herbs
 *   Цель 1: "Собрать 10 \IT[5] трав"
 *   autoProgressObjectives: false
 *   
 *   → Игрок собирает травы, прогресс обновляется автоматически
 *   → При 10/10 можно завершить квест командой "Update Quest Status"
 * 
 * ПРИМЕР 2: Квест с автопрогрессией и доставкой
 *   ID: delivery_quest
 *   autoProgressObjectives: true
 *   Цель 1: "Собрать 5 \IT[10] посылок" (autoTracking: true, visible)
 *   Цель 2: "Отнести посылки в город" (autoTracking: false, hidden)
 *   Цель 3: "Вернуться к отправителю" (autoTracking: false, hidden)
 *   
 *   → Собрали 5/5 посылок → автопереход на Цель 2 (открывается)
 *   → В городе NPC забирает посылки → событие вызывает Complete Objective (obj_2)
 *   → Автопереход на Цель 3 (открывается)
 *   → Вернулись к квестодателю → событие завершает квест
 *   
 *   ВАЖНО: Цели 2 и 3 БЕЗ autoTracking, завершаются событиями!
 * 
 * ПРИМЕР 3: Квест на убийство врагов
 *   ID: hunt_wolves
 *   Цель 1: "Убить 20 \E[3] волков"
 *   onCompleteVariable: 10 (ID переменной "Очков репутации")
 *   onCompleteVariableOp: add
 *   onCompleteVariableValue: 50
 *   
 *   → Убийства считаются автоматически
 *   → При выполнении +50 к переменной "Очков репутации"
 * 
 * ПРИМЕР 4: Многоэтапный квест с триггерами
 *   ID: epic_quest
 *   autoProgressObjectives: true
 *   Цель 1: "Найти древний \A[15] артефакт"
 *     onCompleteSwitch: 5 (открывает подземелье)
 *   Цель 2: "Победить 1 \E[10] босса" (hidden)
 *     onCompleteCommonEvent: 3 (катсцена после победы)
 *   Цель 3: "Вернуть артефакт мудрецу" (hidden)
 *   onCompleteCommonEvent: 5 (финальная катсцена)
 *   
 *   → Нашли артефакт → переключатель 5 ON → открылось подземелье
 *   → Убили босса → запустилось событие 3 (катсцена)
 *   → Вернули артефакт → событие 5 → квест завершён
 * 
 * ============================================================================
 * СОВЕТЫ И РЕКОМЕНДАЦИИ
 * ============================================================================
 * 
 * ✓ Используйте autoProgressObjectives для линейных квестов
 *   Это избавит от необходимости вручную переключать цели
 * 
 * ✓ Скрывайте будущие цели (hidden: true)
 *   Так игрок не будет видеть спойлеры о дальнейших событиях
 * 
 * ✓ Используйте короткий trackerText для трекера
 *   Полное описание для журнала, краткое для трекера на экране
 * 
 * ✓ Комбинируйте несколько токенов в одной цели
 *   "Собрать 5 \IT[1] и 3 \IT[2]" - два условия в одной цели
 * 
 * ✓ Используйте триггеры для сюжетных событий
 *   При выполнении квеста запускайте кат-сцены через Common Events
 * 
 * ✓ Проверяйте статусы в диалогах NPC
 *   Используйте $getQuestStatus() для разных реплик NPC
 * 
 * ✓ Категоризируйте квесты
 *   main - основной сюжет, side - побочные, custom - особые
 * 
 * ⚠ ВАЖНО: Цели с одинаковыми токенами завершатся одновременно!
 *   
 *   НЕПРАВИЛЬНО (БАГ) (не исправить):
 *   Цель 1: "Собрать \A[73] кольцо" (autoTracking: true)
 *   Цель 2: "Отнести \A[73] бабке" (autoTracking: true)
 *   
 *   Проблема: обе цели отслеживают \A[73].
 *   Когда подберёте кольцо - выполнятся ОБЕ цели сразу!
 *   
 *   ПРАВИЛЬНО (Вариант 1 - Без токена в цели 2):
 *   Цель 1: "Собрать \A[73] кольцо" (autoTracking: true)
 *   Цель 2: "Отнести кольцо бабке" (autoTracking: true)
 *   
 *   Решение: в тексте цели 2 НЕТ токена \A[73], поэтому она
 *   НЕ отслеживается автоматически. Завершите её через событие
 *   командой "Complete Objective" когда игрок отдаст кольцо.
 *   
 *   ПРАВИЛЬНО (Вариант 2 - Отключить autoTracking командой):
 *   Цель 1: "Собрать \A[73] кольцо" (autoTracking: true)
 *   Цель 2: "Отнести \A[73] бабке" (autoTracking: true изначально)
 *   
 *   В событии активации квеста:
 *   ◆Plugin Command: Activate Predefined Quest (quest_001)
 *   ◆Plugin Command: Set Objective Auto Tracking (quest_001, obj_2, false)
 *   
 *   Решение: включаем квест, затем сразу выключаем autoTracking
 *   для цели 2. Теперь она не будет завершаться автоматически.
 *   
 *   ПРАВИЛЬНО (Вариант 3 - В настройках квеста изначально false):
 *   Цель 1: "Собрать \A[73] кольцо" (autoTracking: true)
 *   Цель 2: "Отнести \A[73] бабке" (autoTracking: false)
 *   
 *   Решение: в параметрах плагина сразу создаём цель 2 с
 *   autoTracking = false. Токен \A[73] не будет отслеживаться.
 *   
 *   Пример события у бабки (если цель 2 БЕЗ autoTracking):
 *   ◆Conditional Branch: Script: $isObjectiveCompleted('quest_001', 'obj_1')
 *     ◆Control Variables: #0001 Items Owned: [073] Кольцо
 *     ◆Conditional Branch: Variable [0001] >= 1
 *       ◆Text: Спасибо за кольцо!
 *       ◆Change Items: [073] Кольцо -= 1
 *       ◆Plugin Command: Complete Objective (quest_001, obj_2)
 *     : Else
 *       ◆Text: У тебя же нет кольца...
 *     : Branch End
 *   : Branch End
 *   
 *   Правило: если две цели следят за ОДНИМ предметом,
 *   НЕ используйте токен во второй цели ИЛИ отключите autoTracking!
 * 
 * ------------------------------------------------------------
  * @command ActivatePredefinedQuest
 * @text Активировать предустановленный квест
 * @desc Активировать предустановленный квест по его ID.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @command AddQuest
 * @text Добавить квест
 * @desc Создать новый квест динамически во время игры.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg title
 * @text Название
 * @desc Название квеста (поддержка управляющих кодов)
 * @type text
 * @default Новый квест
 *
 * @arg categoryId
 * @text ID категории
 * @desc main / side или ID кастомной категории
 * @type text
 * @default main
 *
 * @arg description
 * @text Описание
 * @desc Подробное описание квеста
 * @type multiline_string
 * @default Описание квеста
 *
 * @arg questGiver
 * @text Квестодатель
 * @desc Имя NPC, который дает квест (опционально)
 * @type text
 * @default
 *
 * @arg location
 * @text Локация
 * @desc Локация, связанная с квестом (опционально)
 * @type text
 * @default
 *
 * @arg objectives
 * @text Цели квеста
 * @desc Список целей квеста
 * @type struct<ObjectiveData>[]
 * @default []
 *
 * @arg reward
 * @text Награда
 * @desc Описание награды за квест (опционально)
 * @type multiline_string
 * @default
 *
 * @arg initialStatus
 * @text Начальный статус
 * @desc Статус квеста при создании
 * @type select
 * @option Скрыт
 * @value hidden
 * @option Доступен
 * @value available
 * @option Активен
 * @value active
 * @default hidden

 * @arg trackOnCreate
 * @text Добавить в трекер
 * @desc Сразу добавить квест в окно отслеживания
 * @type boolean
 * @default false
 *
 * @command UpdateQuestStatus
 * @text Изменить статус квеста
 * @desc Изменить статус существующего квеста.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg status
 * @text Новый статус
 * @desc Новый статус квеста
 * @type select
 * @option Доступен
 * @value available
 * @option Активен
 * @value active
 * @option Завершен
 * @value completed
 * @option Провален
 * @value failed
 * @option Скрыт
 * @value hidden
 * @default active
 *
 * @command CompleteObjective
 * @text Выполнить цель
 * @desc Отметить цель квеста как выполненную.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор цели внутри квеста
 * @type text
 * @default
 *
 * @command AddObjective
 * @text Добавить цель
 * @desc Добавить новую цель к существующему квесту.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор новой цели
 * @type text
 * @default
 *
 * @arg objectiveText
 * @text Текст цели
 * @desc Текст новой цели (поддержка управляющих кодов)
 * @type text
 * @default Новая цель
 *
 * @command RemoveQuest
 * @text Удалить квест
 * @desc Удалить квест из системы.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @command UpdateQuestField
 * @text Обновить поле квеста
 * @desc Обновить конкретное текстовое поле квеста.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg field
 * @text Поле
 * @desc Поле, которое необходимо изменить
 * @type select
 * @option Название
 * @value title
 * @option Описание
 * @value description
 * @option Квестодатель
 * @value questGiver
 * @option Локация
 * @value location
 * @option Награда
 * @value reward
 * @default title
 *
 * @arg value
 * @text Новое значение
 * @desc Новое значение для выбранного поля
 * @type multiline_string
 * @default
 *
 * @command OpenQuestLog
 * @text Открыть журнал квестов
 * @desc Открыть сцену журнала квестов.

 * @command TrackQuest
 * @text Отслеживать квест
 * @desc Добавить квест в список отслеживания.

 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default

 * @command UntrackQuest
 * @text Перестать отслеживать
 * @desc Удалить квест из списка отслеживания.

 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default

 * @command ToggleQuestTracking
 * @text Переключить отслеживание
 * @desc Изменить состояние отслеживания для квеста.

 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default

 * @command SetObjectiveHidden
 * @text Скрыть/показать цель
 * @desc Изменить видимость цели в журнале и трекере.

 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default

 * @arg objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор цели внутри квеста
 * @type text
 * @default

 * @arg hidden
 * @text Скрыть цель
 * @desc Включить или выключить скрытие цели
 * @type boolean
 * @default false

 * @command SetObjectiveCompleted
 * @text Установить статус цели
 * @desc Установить цель как выполненную или проваленную.

 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default

 * @arg objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор цели внутри квеста
 * @type text
 * @default

 * @arg completed
 * @text Статус выполнения
 * @desc Установить цель как выполненную (true) или не выполненную (false)
 * @type boolean
 * @default true
 *
 * @command SetObjectiveAutoTracking
 * @text Включить/выключить автотрекинг цели
 * @desc Включает или выключает автоматическое отслеживание прогресса цели.
 *
 * @arg questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста
 * @type text
 * @default
 *
 * @arg objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор цели внутри квеста
 * @type text
 * @default
 *
 * @arg autoTracking
 * @text Автотрекинг
 * @desc Включить (true) или выключить (false) автоматическое отслеживание
 * @type boolean
 * @default true
 *
 * @param Quest Database
 * @text База данных квестов
 *
 * @param Predefined Quests
 * @parent Quest Database
 * @text Предустановленные квесты
 * @desc Список заранее настроенных квестов
 * @type struct<QuestData>[]
 * @default ["{\"questId\":\"1\",\"title\":\"Тестовый квест\",\"categoryId\":\"side_1\",\"description\":\"Обычный тест. Точно так же с проверкой переноса, работы escape-кодов. \\nЩас с красной строки. \\n И ещё. \\\\C[\\\\V[1]]ЦВЕТ\\\\C[0] | \\\\FS[\\\\V[2]]размер\\\\FS[26] | переменная №1 - \\\\V[1] - привяжем к ней первый цвет, #2 - \\\\V[2] - а тут размер.\\nЧтоб Увидеть цвет измените значение переменной №1. Для Изменения размера текста увеличьте переменную №2 на 30+\",\"showAvailableMainDescription\":\"false\",\"availableDescription\":\"НПС Что то хочет от тебя\",\"questGiver\":\"НПС\",\"location\":\"Мухосранск\",\"objectives\":\"[\\\"{\\\\\\\"objectiveId\\\\\\\":\\\\\\\"1_1\\\\\\\",\\\\\\\"text\\\\\\\":\\\\\\\"Убить 4 \\\\\\\\\\\\\\\\E[1] для НПС\\\\\\\",\\\\\\\"hidden\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"trackerText\\\\\\\":\\\\\\\"Убить 4 \\\\\\\\\\\\\\\\E[1]\\\\\\\"}\\\",\\\"{\\\\\\\"objectiveId\\\\\\\":\\\\\\\"1_2\\\\\\\",\\\\\\\"text\\\\\\\":\\\\\\\"Вернуться к квестодателю.\\\\\\\",\\\\\\\"hidden\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"trackerText\\\\\\\":\\\\\\\"Обратно\\\\\\\"}\\\"]\",\"reward\":\"Какая то награда.\",\"showCompletedMainDescription\":\"false\",\"completedDescription\":\"Ура Ты выполнил задание\",\"showFailedMainDescription\":\"false\",\"failedDescription\":\"К сожалению ты провалил этот квест.\",\"initialStatus\":\"available\"}","{\"questId\":\"quest_001\",\"title\":\"Найди потерянное кольцо\",\"categoryId\":\"side\",\"description\":\"Бабка потеряла \\\\A[79] в лесу. Найди его.\",\"showAvailableMainDescription\":\"false\",\"availableDescription\":\"Бабке у сторожевой башни что то нужно.\",\"questGiver\":\"Бабка\",\"location\":\"\",\"objectives\":\"[\\\"{\\\\\\\"objectiveId\\\\\\\":\\\\\\\"obj_1\\\\\\\",\\\\\\\"text\\\\\\\":\\\\\\\"Ищи \\\\\\\\\\\\\\\\A[73] среди деревьев\\\\\\\",\\\\\\\"hidden\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"trackerText\\\\\\\":\\\\\\\"Найти \\\\\\\\\\\\\\\\A[73]\\\\\\\"}\\\",\\\"{\\\\\\\"objectiveId\\\\\\\":\\\\\\\"obj_2\\\\\\\",\\\\\\\"text\\\\\\\":\\\\\\\"Отнеси \\\\\\\\\\\\\\\\A[79] Бабке.\\\\\\\",\\\\\\\"hidden\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"trackerText\\\\\\\":\\\\\\\"Вернуть \\\\\\\\\\\\\\\\A[79]\\\\\\\"}\\\"]\",\"reward\":\"\\\\IT[15] - 3 шт.\",\"showCompletedMainDescription\":\"true\",\"completedDescription\":\"\",\"showFailedMainDescription\":\"true\",\"failedDescription\":\"\",\"initialStatus\":\"available\"}"]
 *
 * @param Custom Categories
 * @parent Quest Database
 * @text Кастомные категории
 * @desc Дополнительные категории квестов
 * @type struct<CategoryData>[]
 * @default ["{\"categoryId\":\"side_1\",\"categoryName\":\"\\\\I[15]Секретные задания\",\"categoryDescription\":\"\\\\I[14]Всякие Секретные задания. В \\\\C[4]целом\\\\C[0] просто проверка. Вот тут переменная 1 -\\\\C[10]\\\\V[1]\\\\C[0]. Ну и иимя 1 актера - \\\\C[6]\\\\N[1]\\\\C[0], раз аткое дело то увеличим \\\\{этот текст и \\\\C[20]раскрасим..\\\\C[0]\\\\} Кстати текст написан в одну строку, так что это и проверка переноса строк.\",\"categoryIcon\":\"0\",\"sortOrder\":\"2\"}","{\"categoryId\":\"side\",\"categoryName\":\"Дополнительные\",\"categoryDescription\":\"Дополнительные задания.\\nПросто немного примеров.\",\"categoryIcon\":\"45\",\"sortOrder\":\"3\"}"]
 *
 * @param UI Settings
 * @text Настройки интерфейса
 *
 * @param Category Window Layout
 * @parent UI Settings
 * @text Расположение окна категорий
 * @type select
 * @option vertical
 * @value vertical
 * @option horizontal
 * @value horizontal
 * @default horizontal
 *
 * @param Show Quest Counter
 * @parent UI Settings
 * @text Показывать счетчик квестов
 * @type boolean
 * @default false

 * @param Category Counter Mode
 * @parent UI Settings
 * @text Формат счетчика категорий
 * @type select
 * @option Активные/Доступные
 * @value activeAvailable
 * @option Только активные
 * @value activeOnly
 * @option Не показывать
 * @value none
 * @default none

 * @param Status Category Settings
 * @parent UI Settings
 * @text Категории статусов

 * @param Show Completed Category
 * @parent Status Category Settings
 * @text Категория завершенных
 * @type boolean
 * @default true

 * @param Show Failed Category
 * @parent Status Category Settings
 * @text Категория проваленных
 * @type boolean
 * @default true
 *
 * @param Show Completed Quests
 * @parent UI Settings
 * @text Показывать завершенные квесты
 * @type boolean
 * @default true
 *
 * @param Show Failed Quests
 * @parent UI Settings
 * @text Показывать проваленные квесты
 * @type boolean
 * @default true

 * @param Tracker Settings
 * @parent UI Settings
 * @text Настройки трекера

 * @param Tracker Window X
 * @parent Tracker Settings
 * @text Позиция окна X
 * @desc Смещение окна трекера по горизонтали (в пикселях)
 * @type number
 * @min 0
 * @default 24

 * @param Tracker Window Y
 * @parent Tracker Settings
 * @text Позиция окна Y
 * @desc Смещение окна трекера по вертикали (в пикселях)
 * @type number
 * @min 0
 * @default 24

 * @param Tracker Window Width
 * @parent Tracker Settings
 * @text Ширина окна
 * @desc Ширина окна трекера (в пикселях)
 * @type number
 * @min 120
 * @default 440

 * @param Tracker Window Max Height
 * @parent Tracker Settings
 * @text Максимальная высота
 * @desc Максимальная высота окна трекера (в пикселях)
 * @type number
 * @min 80
 * @default 260

 * @param Tracker Max Entries
 * @parent Tracker Settings
 * @text Максимум отслеживаемых квестов
 * @desc Максимальное количество квестов, отображаемых в трекере одновременно
 * @type number
 * @min 1
 * @default 5

 * @param Tracker Window Opacity
 * @parent Tracker Settings
 * @text Прозрачность окна
 * @desc Прозрачность рамки окна трекера (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 150

 * @param Tracker Background Opacity
 * @parent Tracker Settings
 * @text Прозрачность фона
 * @desc Прозрачность фона окна трекера (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param Tracker Background Image
 * @parent Tracker Settings
 * @text Файл фона
 * @desc Имя файла из img/pictures/ без расширения. Пусто = без фонового изображения.
 * @type file
 * @dir img/pictures/
 * @default 

 * @param Tracker Background Scale Mode
 * @parent Tracker Settings
 * @text Масштаб фона
 * @type select
 * @option Вписать (без обрезки)
 * @value contain
 * @option Заполнить (с обрезкой)
 * @value cover
 * @option Растянуть (искажение)
 * @value stretch
 * @default contain

 * @param Tracker Auto Scale Text
 * @parent Tracker Settings
 * @text Автомасштаб текста
 * @desc Подгонять шрифт под ширину окна трекера
 * @type boolean
 * @on Да
 * @off Нет
 * @default true

 * @param Tracker Text Min Scale %
 * @parent Tracker Settings
 * @text Минимальный масштаб текста (%)
 * @desc Нижний предел автомасштаба (в процентах от базового размера)
 * @type number
 * @min 10
 * @max 500
 * @default 50

 * @param Tracker Text Max Scale %
 * @parent Tracker Settings
 * @text Максимальный масштаб текста (%)
 * @desc Верхний предел автомасштаба (в процентах от базового размера)
 * @type number
 * @min 50
 * @max 500
 * @default 200

 * @param Tracker Padding
 * @parent Tracker Settings
 * @text Внутренние отступы
 * @desc Отступы содержимого окна трекера (в пикселях)
 * @type number
 * @min 6
 * @default 18

 * @param Tracker Title Font Size
 * @parent Tracker Settings
 * @text Размер шрифта заголовка
 * @desc Размер шрифта названия квеста в трекере
 * @type number
 * @min 12
 * @default 16

 * @param Tracker Objective Font Size
 * @parent Tracker Settings
 * @text Размер шрифта целей
 * @desc Размер шрифта описания цели в трекере
 * @type number
 * @min 12
 * @default 14

 * @param Tracker Line Spacing
 * @parent Tracker Settings
 * @text Интервал между записями
 * @desc Дополнительный зазор между квестами в трекере
 * @type number
 * @min 0
 * @default 4
 *
 * @param Max Quests Per Category
 * @parent UI Settings
 * @text Лимит квестов в категории
 * @type number
 * @min 0
 * @default 50
 *
 * @param Menu Settings
 * @text Настройки меню
 *
 * @param Show In Menu
 * @parent Menu Settings
 * @text Добавить в главное меню
 * @type boolean
 * @default true
 *
 * @param Menu Command Name
 * @parent Menu Settings
 * @text Название команды в меню
 * @type text
 * @default Квесты
 *
 * @param Menu Command Symbol
 * @parent Menu Settings
 * @text Символ команды
 * @type text
 * @default questLog

 * @param Quest Log Background Image
 * @parent Menu Settings
 * @text Фон меню квестов
 * @desc Имя файла из img/pictures/ без расширения. Пусто = без кастомного фона.
 * @type file
 * @dir img/pictures/
 * @default 

 * @param Quest Log Background Scale Mode
 * @parent Menu Settings
 * @text Масштаб фона меню
 * @type select
 * @option Вписать (без обрезки)
 * @value contain
 * @option Заполнить (с обрезкой)
 * @value cover
 * @option Растянуть (искажение)
 * @value stretch
 * @default contain

 * @param Quest Log Window Opacity
 * @parent Menu Settings
 * @text Прозрачность рамки меню
 * @desc Прозрачность рамки окон журнала квестов (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param Quest Log Background Opacity
 * @parent Menu Settings
 * @text Прозрачность фона меню
 * @desc Прозрачность фона окон журнала квестов (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Quest Tracking Button
 * @parent Menu Settings
 * @text Кнопка отслеживания квестов
 * @desc Кнопка для переключения отслеживания квеста в журнале (ok/cancel/shift/control/tab/pageup/pagedown)
 * @type text
 * @default shift
 *
 * @param Text Settings
 * @text Настройки текста
 *
 * @param Category Main Text
 * @parent Text Settings
 * @text Название категории "Основные"
 * @type text
 * @default Основные квесты
 *
 * @param Category Main Description
 * @parent Text Settings
 * @text Описание категории "Основные"
 * @desc Описание основной категории квестов
 * @type multiline_string
 * @default Основные сюжетные квесты

 * @param Category Completed Text
 * @parent Text Settings
 * @text Название категории "Завершенные"
 * @type text
 * @default Завершенные квесты

 * @param Category Completed Description
 * @parent Text Settings
 * @text Описание категории "Завершенные"
 * @type multiline_string
 * @default Квесты, которые были успешно завершены

 * @param Category Failed Text
 * @parent Text Settings
 * @text Название категории "Проваленные"
 * @type text
 * @default Проваленные квесты

 * @param Category Failed Description
 * @parent Text Settings
 * @text Описание категории "Проваленные"
 * @type multiline_string
 * @default Квесты, завершенные неудачей
 *
 * @param Quest Giver Label
 * @parent Text Settings
 * @text Метка "Квестодатель"
 * @type text
 * @default Квестодатель:
 *
 * @param Location Label
 * @parent Text Settings
 * @text Метка "Локация"
 * @type text
 * @default Локация:
 *
 * @param Objectives Label
 * @parent Text Settings
 * @text Метка "Цели"
 * @type text
 * @default Цели:
 *
 * @param Reward Label
 * @parent Text Settings
 * @text Метка "Награда"
 * @type text
 * @default Награда:
 *
 * @param Status Icons
 * @text Иконки статусов
 *
 * @param Icon Available
 * @parent Status Icons
 * @text Иконка "Доступен"
 * @type number
 * @min 0
 * @default 93
 *
 * @param Icon Active
 * @parent Status Icons
 * @text Иконка "Активен"
 * @type number
 * @min 0
 * @default 92
 *
 * @param Icon Completed
 * @parent Status Icons
 * @text Иконка "Завершен"
 * @type number
 * @min 0
 * @default 90
 *
 * @param Icon Failed
 * @parent Status Icons
 * @text Иконка "Провален"
 * @type number
 * @min 0
 * @default 91

 * @param Category Completed Icon
 * @parent Status Icons
 * @text Иконка категории "Завершенные"
 * @type number
 * @min 0
 * @default 90

 * @param Category Failed Icon
 * @parent Status Icons
 * @text Иконка категории "Проваленные"
 * @type number
 * @min 0
 * @default 91

 * @param Tracked Quest Icon
 * @parent Status Icons
 * @text Иконка "Отслеживается"
 * @type number
 * @min 0
 * @default 190
 *
 * @param UI Text Labels
 * @text Метки текста интерфейса
 *
 * @param Status Label Hidden
 * @parent UI Text Labels
 * @text Статус: Скрыт
 * @desc Отображаемый текст для статуса квеста "Скрыт"
 * @type text
 * @default Скрыт
 *
 * @param Status Label Available
 * @parent UI Text Labels
 * @text Статус: Доступен
 * @desc Отображаемый текст для статуса квеста "Доступен"
 * @type text
 * @default Доступен
 *
 * @param Status Label Active
 * @parent UI Text Labels
 * @text Статус: Активен
 * @desc Отображаемый текст для статуса квеста "Активен"
 * @type text
 * @default Активен
 *
 * @param Status Label Completed
 * @parent UI Text Labels
 * @text Статус: Завершен
 * @desc Отображаемый текст для статуса квеста "Завершен"
 * @type text
 * @default Завершен
 *
 * @param Status Label Failed
 * @parent UI Text Labels
 * @text Статус: Провален
 * @desc Отображаемый текст для статуса квеста "Провален"
 * @type text
 * @default Провален
 *
 * @param UI Label Tracked
 * @parent UI Text Labels
 * @text Метка: Отслеживается
 * @desc Отображаемый текст для индикатора отслеживаемого квеста
 * @type text
 * @default Отслеживается
 *
 * @param UI Label Statistics
 * @parent UI Text Labels
 * @text Метка: Статистика
 * @desc Отображаемый текст для раздела статистики/информации
 * @type text
 * @default Статистика
 *
 * @param Sound Settings
 * @text Настройки звуков
 *
 * @param Quest Complete SE
 * @parent Sound Settings
 * @text Звук завершения квеста
 * @type file
 * @dir audio/se
 * @default Victory1
 *
 * @param Objective Complete SE
 * @parent Sound Settings
 * @text Звук завершения цели
 * @type file
 * @dir audio/se
 * @default Item3
 *
 * @param Quest Failed SE
 * @parent Sound Settings
 * @text Звук провала квеста
 * @type file
 * @dir audio/se
 * @default Buzzer1
 *
 * @param Notification Settings
 * @text Настройки уведомлений

 * @param Show Notifications
 * @parent Notification Settings
 * @text Показывать уведомления
 * @desc Включить/выключить всплывающие уведомления о квестах
 * @type boolean
 * @default true

 * @param Notification Window X
 * @parent Notification Settings
 * @text Позиция окна X
 * @desc Позиция окна уведомлений по горизонтали (в пикселях от левого края). -1 = автоматически справа
 * @type number
 * @min -1
 * @default -1

 * @param Notification Window Y
 * @parent Notification Settings
 * @text Позиция окна Y
 * @desc Позиция окна уведомлений по вертикали (в пикселях от верхнего края)
 * @type number
 * @min 0
 * @default 24

 * @param Notification Window Width
 * @parent Notification Settings
 * @text Ширина окна
 * @desc Ширина окна уведомлений (в пикселях)
 * @type number
 * @min 200
 * @default 520

 * @param Notification Window Height
 * @parent Notification Settings
 * @text Высота окна
 * @desc Высота окна уведомлений (в пикселях)
 * @type number
 * @min 40
 * @default 72

 * @param Notification Duration
 * @parent Notification Settings
 * @text Длительность показа
 * @desc Длительность показа уведомления (в кадрах, 60 = 1 секунда)
 * @type number
 * @min 30
 * @default 180

 * @param Notification Window Opacity
 * @parent Notification Settings
 * @text Прозрачность рамки
 * @desc Прозрачность рамки окна уведомлений (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param Notification Background Opacity
 * @parent Notification Settings
 * @text Прозрачность фона
 * @desc Прозрачность фона окна уведомлений (0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 255

 * @param Notification Font Size
 * @parent Notification Settings
 * @text Размер шрифта
 * @desc Размер шрифта в окне уведомлений (0 = автоматически)
 * @type number
 * @min 0
 * @default 0

 * @param Notification Text Settings
 * @parent Notification Settings
 * @text Тексты уведомлений

 * @param Objective Complete Text
 * @parent Notification Text Settings
 * @text Текст выполнения цели
 * @desc Шаблон уведомления при выполнении цели. %1 = название квеста, %2 = описание цели
 * @type text
 * @default Цель выполнена: %1\n%2

 * @param Quest Complete Text
 * @parent Notification Text Settings
 * @text Текст завершения квеста
 * @desc Шаблон уведомления при завершении квеста. %1 = название квеста
 * @type text
 * @default Квест завершен: %1

 * @param Quest Failed Text
 * @parent Notification Text Settings
 * @text Текст провала квеста
 * @desc Шаблон уведомления при провале квеста. %1 = название квеста
 * @type text
 * @default Квест провален: %1

 * @param Show Quest Icon In Notification
 * @parent Notification Text Settings
 * @text Показывать иконку статуса
 * @desc Добавлять иконку статуса квеста перед текстом уведомления
 * @type boolean
 * @default true
 */

/*~struct~QuestData:
 * @param questId
 * @text ID квеста
 * @desc Уникальный идентификатор квеста (буквы, цифры, подчеркивания)
 * @type text
 * @default quest_001
 *
 * @param title
 * @text Название
 * @desc Заголовок квеста (поддержка управляющих кодов)
 * @type text
 * @default Новый квест
 *
 * @param categoryId
 * @text Категория
 * @desc main / side или ID кастомной категории
 * @type text
 * @default main
 *
 * @param description
 * @text Описание
 * @desc Полное описание квеста
 * @type multiline_string
 * @default Описание квеста

 * @param showAvailableMainDescription
 * @text Показывать описание (доступен)
 * @desc Отображать основное описание, пока квест доступен, но не активен
 * @type boolean
 * @on Да
 * @off Нет
 * @default true

 * @param availableDescription
 * @text Текст до принятия
 * @desc Альтернативное описание для статуса «Доступен» (если основное скрыто)
 * @type multiline_string
 * @default
 *
 * @param questGiver
 * @text Квестодатель
 * @desc Имя NPC, дающего квест
 * @type text
 * @default
 *
 * @param location
 * @text Локация
 * @desc Связанная локация (опционально)
 * @type text
 * @default
 *
 * @param objectives
 * @text Цели квеста
 * @desc Список целей квеста
 * @type struct<ObjectiveData>[]
 * @default []
 *
 * @param reward
 * @text Награда
 * @desc Описание награды (опционально)
 * @type multiline_string
 * @default
 *
 * @param showCompletedMainDescription
 * @text Показывать описание (завершен)
 * @desc Отображать основное описание после завершения квеста
 * @type boolean
 * @on Да
 * @off Нет
 * @default true

 * @param completedDescription
 * @text Текст после завершения
 * @desc Альтернативное описание для статуса «Завершен» (если основное скрыто)
 * @type multiline_string
 * @default

 * @param showFailedMainDescription
 * @text Показывать описание (провален)
 * @desc Отображать основное описание после провала квеста
 * @type boolean
 * @on Да
 * @off Нет
 * @default true

 * @param failedDescription
 * @text Текст после провала
 * @desc Альтернативное описание для статуса «Провален» (если основное скрыто)
 * @type multiline_string
 * @default

 * @param initialStatus
 * @text Начальный статус
 * @desc Статус квеста при создании новой игры
 * @type select
 * @option Скрыт
 * @value hidden
 * @option Доступен
 * @value available
 * @option Активен
 * @value active
 * @default hidden

 * @param autoProgressObjectives
 * @text Автопереключение целей
 * @desc Автоматически переключать на следующую цель при выполнении. Скрытые цели будут открываться. Откат при потере предметов.
 * @type boolean
 * @default false

 * @param onCompleteCommonEvent
 * @text Общее событие (завершение)
 * @desc ID общего события при завершении квеста (0 = не запускать)
 * @type common_event
 * @default 0

 * @param onCompleteSwitch
 * @text Переключатель (завершение)
 * @desc ID переключателя при завершении квеста (0 = не использовать)
 * @type switch
 * @default 0

 * @param onCompleteVariable
 * @text Переменная (завершение)
 * @desc ID переменной при завершении квеста (0 = не использовать)
 * @type variable
 * @default 0

 * @param onCompleteVariableOp
 * @text Операция с переменной (завершение)
 * @desc Как изменить переменную
 * @type select
 * @option Установить =
 * @value set
 * @option Прибавить +
 * @value add
 * @option Отнять -
 * @value sub
 * @default set

 * @param onCompleteVariableValue
 * @text Значение переменной (завершение)
 * @desc Значение для переменной при завершении квеста
 * @type number
 * @default 1

 * @param onFailCommonEvent
 * @text Общее событие (провал)
 * @desc ID общего события при провале квеста (0 = не запускать)
 * @type common_event
 * @default 0

 * @param onFailSwitch
 * @text Переключатель (провал)
 * @desc ID переключателя при провале квеста (0 = не использовать)
 * @type switch
 * @default 0

 * @param onFailVariable
 * @text Переменная (провал)
 * @desc ID переменной при провале квеста (0 = не использовать)
 * @type variable
 * @default 0

 * @param onFailVariableOp
 * @text Операция с переменной (провал)
 * @desc Как изменить переменную
 * @type select
 * @option Установить =
 * @value set
 * @option Прибавить +
 * @value add
 * @option Отнять -
 * @value sub
 * @default set

 * @param onFailVariableValue
 * @text Значение переменной (провал)
 * @desc Значение для переменной при провале квеста
 * @type number
 * @default 1
 */

/*~struct~ObjectiveData:
 * @param objectiveId
 * @text ID цели
 * @desc Уникальный идентификатор цели внутри квеста
 * @type text
 * @default obj_1
 *
 * @param text
 * @text Описание цели
 * @desc Текст цели (поддержка управляющих кодов)
 * @type text
 * @default Выполнить задание

 * @param hidden
 * @text Скрыта по умолчанию
 * @desc Скрывать цель в журнале и трекере, пока она не будет открыта
 * @type boolean
 * @default false

 * @param trackerText
 * @text Короткий текст для трекера
 * @desc Альтернативное короткое описание для отслеживания (если пусто, используется основной текст)
 * @type text
 * @default

 * @param onCompleteCommonEvent
 * @text Общее событие при завершении
 * @desc ID общего события, которое запустится при выполнении цели (0 = не запускать)
 * @type common_event
 * @default 0

 * @param onCompleteSwitch
 * @text Переключатель при завершении
 * @desc ID переключателя, который включится при выполнении цели (0 = не использовать)
 * @type switch
 * @default 0

 * @param onCompleteVariable
 * @text Переменная при завершении
 * @desc ID переменной для изменения при выполнении цели (0 = не использовать)
 * @type variable
 * @default 0

 * @param onCompleteVariableOp
 * @text Операция с переменной
 * @desc Как изменить переменную
 * @type select
 * @option Установить =
 * @value set
 * @option Прибавить +
 * @value add
 * @option Отнять -
 * @value sub
 * @default set

 * @param onCompleteVariableValue
 * @text Значение переменной
 * @desc Значение, которое будет установлено в переменную при выполнении цели
 * @type number
 * @default 1
 */

/*~struct~CategoryData:
 * @param categoryId
 * @text ID категории
 * @desc Уникальный идентификатор категории (буквы, цифры, подчёркивания)
 * @type text
 * @default custom_cat
 *
 * @param categoryName
 * @text Название категории
 * @desc Отображаемое название (поддержка управляющих кодов)
 * @type text
 * @default Кастомная категория
 *
 * @param categoryDescription
 * @text Описание категории
 * @desc Описание, отображаемое в окне деталей при выборе категории
 * @type multiline_string
 * @default
 *
 * @param categoryIcon
 * @text Иконка категории
 * @desc ID иконки (0 = без иконки)
 * @type number
 * @min 0
 * @default 0
 *
 * @param sortOrder
 * @text Порядок сортировки
 * @desc Порядок отображения (меньше = выше)
 * @type number
 * @min 0
 * @default 100
 */
(() => {
    "use strict";

    const pluginName = "ToshA_QuestSystem";
    const rawParameters = PluginManager.parameters(pluginName);

    const toBoolean = (value, defaultValue = false) => {
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        }
        if (typeof value === "boolean") {
            return value;
        }
        return String(value).toLowerCase() === "true";
    };

    const toNumber = (value, defaultValue = 0) => {
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        }
        const number = Number(value);
        return Number.isNaN(number) ? defaultValue : number;
    };

    const parseJson = (value, defaultValue) => {
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        }
        if (typeof value === "object") {
            return value;
        }
        if (typeof value !== "string") {
            return defaultValue;
        }
        try {
            return JSON.parse(value);
        } catch (error) {
            console.warn(`[${pluginName}] Не удалось распарсить JSON:`, value, error);
            return defaultValue;
        }
    };

    const parseStruct = (value) => parseJson(value, {});
    const parseStructArray = (value) => parseJson(value, []).map(parseStruct);

    const deepClone = (value) => {
        return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
    };

    const decodeText = (text) => {
        if (typeof text !== "string") {
            return "";
        }
        return text.replace(/\\n/g, "\n");
    };

    const clamp = (value, min, max) => {
        if (min > max) {
            return value;
        }
        return Math.max(min, Math.min(max, value));
    };

    const createTrackingTokenRegex = () => /(?:(\d+)\s*[-xX*]?\s*)?\\(IT|W|A|E)\[(\d+)\]/gi;

    const parseTrackingTargets = (text) => {
        if (typeof text !== "string" || !text) {
            return [];
        }
        const targets = [];
        const regex = createTrackingTokenRegex();
        let match;
        while ((match = regex.exec(text)) !== null) {
            const amountRaw = match[1];
            const typeRaw = match[2];
            const idRaw = match[3];
            const id = Number(idRaw);
            if (!Number.isFinite(id) || id <= 0) {
                continue;
            }
            const parsedAmount = amountRaw ? Number(amountRaw.replace(/[^\d]/g, "")) : NaN;
            const amount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 1;
            const type = String(typeRaw || "").toUpperCase();
            const normalizedType = type === "I" ? "IT" : type;
            if (!["IT", "W", "A", "E"].includes(normalizedType)) {
                continue;
            }
            targets.push({ type: normalizedType, id, amount });
        }
        return targets;
    };

    const makeTrackingKey = (type, id) => `${String(type || "").toUpperCase()}:${Number(id)}`;

    const serializeTrackingTargets = (targets) => {
        if (!Array.isArray(targets) || targets.length === 0) {
            return "[]";
        }
        const normalized = targets.map((target) => ({
            type: String(target.type || "").toUpperCase(),
            id: Number(target.id) || 0,
            amount: Number(target.amount) || 0
        }));
        normalized.sort((a, b) => {
            const typeCompare = a.type.localeCompare(b.type);
            if (typeCompare !== 0) {
                return typeCompare;
            }
            if (a.id !== b.id) {
                return a.id - b.id;
            }
            return a.amount - b.amount;
        });
        return JSON.stringify(normalized);
    };

    const parseObjectiveDataStruct = (struct) => {
        const data = { ...struct };
        const text = decodeText(data.text || "");
        const trackerText = decodeText(data.trackerText || "");
        return {
            id: String(data.objectiveId || "").trim(),
            text,
            hidden: toBoolean(data.hidden, false),
            trackerText,
            trackingTargets: parseTrackingTargets(text),
            trackingBaselines: {},
            localKillCounts: {}, // Локальный счётчик убийств для этой цели
            completed: false,
            onCompleteCommonEvent: toNumber(data.onCompleteCommonEvent, 0),
            onCompleteSwitch: toNumber(data.onCompleteSwitch, 0),
            onCompleteVariable: toNumber(data.onCompleteVariable, 0),
            onCompleteVariableOp: String(data.onCompleteVariableOp || "set").trim(),
            onCompleteVariableValue: toNumber(data.onCompleteVariableValue, 1)
        };
    };

    const parseQuestDataStruct = (struct) => {
        const data = { ...struct };
        const objectives = parseStructArray(data.objectives || "[]").map(parseObjectiveDataStruct);
        const showAvailableMainDescription = toBoolean(data.showAvailableMainDescription, true);
        const availableDescription = decodeText(data.availableDescription || "");
        const showCompletedMainDescription = toBoolean(data.showCompletedMainDescription, true);
        const completedDescription = decodeText(data.completedDescription || "");
        const showFailedMainDescription = toBoolean(data.showFailedMainDescription, true);
        const failedDescription = decodeText(data.failedDescription || "");
        return {
            id: String(data.questId || "").trim(),
            title: decodeText(data.title || ""),
            categoryId: String(data.categoryId || "main").trim() || "main",
            description: decodeText(data.description || ""),
            questGiver: decodeText(data.questGiver || ""),
            location: decodeText(data.location || ""),
            objectives,
            reward: decodeText(data.reward || ""),
            showAvailableMainDescription,
            availableDescription,
            showCompletedMainDescription,
            completedDescription,
            showFailedMainDescription,
            failedDescription,
            initialStatus: String(data.initialStatus || "hidden").trim() || "hidden",
            autoProgressObjectives: toBoolean(data.autoProgressObjectives, false),
            onCompleteCommonEvent: toNumber(data.onCompleteCommonEvent, 0),
            onCompleteSwitch: toNumber(data.onCompleteSwitch, 0),
            onCompleteVariable: toNumber(data.onCompleteVariable, 0),
            onCompleteVariableOp: String(data.onCompleteVariableOp || "set").trim(),
            onCompleteVariableValue: toNumber(data.onCompleteVariableValue, 1),
            onFailCommonEvent: toNumber(data.onFailCommonEvent, 0),
            onFailSwitch: toNumber(data.onFailSwitch, 0),
            onFailVariable: toNumber(data.onFailVariable, 0),
            onFailVariableOp: String(data.onFailVariableOp || "set").trim(),
            onFailVariableValue: toNumber(data.onFailVariableValue, 1)
        };
    };

    const parseCategoryDataStruct = (struct) => {
        const data = { ...struct };
        return {
            id: String(data.categoryId || "").trim(),
            name: decodeText(data.categoryName || ""),
            description: decodeText(data.categoryDescription || ""),
            icon: toNumber(data.categoryIcon, 0),
            sortOrder: toNumber(data.sortOrder, 100)
        };
    };

    const CATEGORY_COUNTER_MODES = Object.freeze({
        ACTIVE_AVAILABLE: "activeAvailable",
        ACTIVE_ONLY: "activeOnly",
        NONE: "none"
    });

    const normalizeCounterMode = (value) => {
        const normalized = String(value || "").trim();
        if (Object.values(CATEGORY_COUNTER_MODES).includes(normalized)) {
            return normalized;
        }
        return CATEGORY_COUNTER_MODES.ACTIVE_AVAILABLE;
    };

    const BACKGROUND_SCALE_MODES = Object.freeze({
        CONTAIN: "contain",
        COVER: "cover",
        STRETCH: "stretch"
    });

    const normalizeScaleMode = (value, defaultValue = BACKGROUND_SCALE_MODES.CONTAIN) => {
        const normalized = String(value || "").trim().toLowerCase();
        if (Object.values(BACKGROUND_SCALE_MODES).includes(normalized)) {
            return normalized;
        }
        return defaultValue;
    };

    const applyResponsiveSpriteLayout = (sprite, targetWidth, targetHeight, scaleMode) => {
        if (!sprite || !sprite.bitmap) {
            return;
        }
        const bitmap = sprite.bitmap;
        const sourceWidth = bitmap.width;
        const sourceHeight = bitmap.height;
        if (sourceWidth <= 0 || sourceHeight <= 0) {
            return;
        }
        if (typeof sprite.anchor?.set === "function") {
            sprite.anchor.set(0.5, 0.5);
        }
        const scaleX = targetWidth / sourceWidth;
        const scaleY = targetHeight / sourceHeight;
        let appliedScaleX = scaleX;
        let appliedScaleY = scaleY;
        switch (scaleMode) {
            case BACKGROUND_SCALE_MODES.COVER: {
                const scale = Math.max(scaleX, scaleY);
                appliedScaleX = scale;
                appliedScaleY = scale;
                break;
            }
            case BACKGROUND_SCALE_MODES.CONTAIN: {
                const scale = Math.min(scaleX, scaleY);
                appliedScaleX = scale;
                appliedScaleY = scale;
                break;
            }
            case BACKGROUND_SCALE_MODES.STRETCH:
            default:
                appliedScaleX = scaleX;
                appliedScaleY = scaleY;
                break;
        }
        sprite.scale.x = appliedScaleX;
        sprite.scale.y = appliedScaleY;
        sprite.x = targetWidth * 0.5;
        sprite.y = targetHeight * 0.5;
    };

    const SPECIAL_CATEGORY_IDS = Object.freeze({
        COMPLETED: "__status_completed__",
        FAILED: "__status_failed__"
    });

    const requestTrackerRefresh = () => {
        if (typeof window !== "undefined") {
            const tracker = window.QuestTrackerManager;
            if (tracker && typeof tracker.requestRefresh === "function") {
                tracker.requestRefresh();
            }
        }
    };

    const trackerTextScaleMinPercent = clamp(toNumber(rawParameters["Tracker Text Min Scale %"], 80), 10, 500);
    const trackerTextScaleMaxPercent = clamp(toNumber(rawParameters["Tracker Text Max Scale %"], 130), 50, 500);
    const trackerTextScaleMin = Math.max(0.1, trackerTextScaleMinPercent / 100);
    const trackerTextScaleMax = Math.max(trackerTextScaleMin, trackerTextScaleMaxPercent / 100);

    const QuestSystemParams = {
        predefinedQuests: parseStructArray(rawParameters["Predefined Quests"]).map(parseQuestDataStruct),
        customCategories: parseStructArray(rawParameters["Custom Categories"]).map(parseCategoryDataStruct),
        layout: String(rawParameters["Category Window Layout"] || "vertical"),
        showQuestCounter: toBoolean(rawParameters["Show Quest Counter"], true),
    categoryCounterMode: normalizeCounterMode(rawParameters["Category Counter Mode"] || CATEGORY_COUNTER_MODES.ACTIVE_AVAILABLE),
    showCompletedCategory: toBoolean(rawParameters["Show Completed Category"], false),
    showFailedCategory: toBoolean(rawParameters["Show Failed Category"], false),
        showCompleted: toBoolean(rawParameters["Show Completed Quests"], true),
        showFailed: toBoolean(rawParameters["Show Failed Quests"], true),
        maxQuestsPerCategory: toNumber(rawParameters["Max Quests Per Category"], 0),
        showInMenu: toBoolean(rawParameters["Show In Menu"], true),
        menuCommandName: String(rawParameters["Menu Command Name"] || "Квесты"),
        menuCommandSymbol: String(rawParameters["Menu Command Symbol"] || "questLog"),
        text: {
            categoryMain: String(rawParameters["Category Main Text"] || "Основные квесты"),
            categoryMainDescription: String(rawParameters["Category Main Description"] || "Основные сюжетные квесты"),
            categoryCompleted: String(rawParameters["Category Completed Text"] || "Завершенные квесты"),
            categoryCompletedDescription: String(rawParameters["Category Completed Description"] || "Квесты, которые были успешно завершены"),
            categoryFailed: String(rawParameters["Category Failed Text"] || "Проваленные квесты"),
            categoryFailedDescription: String(rawParameters["Category Failed Description"] || "Квесты, завершенные неудачей"),
            questGiver: String(rawParameters["Quest Giver Label"] || "Квестодатель:"),
            location: String(rawParameters["Location Label"] || "Локация:"),
            objectives: String(rawParameters["Objectives Label"] || "Цели:"),
            reward: String(rawParameters["Reward Label"] || "Награда:")
        },
        icons: {
            available: toNumber(rawParameters["Icon Available"], 83),
            active: toNumber(rawParameters["Icon Active"], 87),
            completed: toNumber(rawParameters["Icon Completed"], 91),
            failed: toNumber(rawParameters["Icon Failed"], 90),
            categoryCompleted: toNumber(rawParameters["Category Completed Icon"], 91),
            categoryFailed: toNumber(rawParameters["Category Failed Icon"], 90),
            tracked: toNumber(rawParameters["Tracked Quest Icon"], 190)
        },
        tracker: {
            x: Math.max(0, toNumber(rawParameters["Tracker Window X"], 24)),
            y: Math.max(0, toNumber(rawParameters["Tracker Window Y"], 24)),
            width: Math.max(120, toNumber(rawParameters["Tracker Window Width"], 440)),
            maxHeight: Math.max(80, toNumber(rawParameters["Tracker Window Max Height"], 260)),
            maxEntries: Math.max(1, toNumber(rawParameters["Tracker Max Entries"], 5) || 5),
            windowOpacity: clamp(toNumber(rawParameters["Tracker Window Opacity"], 0), 0, 255),
            backgroundOpacity: clamp(toNumber(rawParameters["Tracker Background Opacity"], 160), 0, 255),
            backgroundImage: String(rawParameters["Tracker Background Image"] || "").trim(),
            backgroundScaleMode: normalizeScaleMode(rawParameters["Tracker Background Scale Mode"], BACKGROUND_SCALE_MODES.CONTAIN),
            autoScaleText: toBoolean(rawParameters["Tracker Auto Scale Text"], false),
            textScaleMin: trackerTextScaleMin,
            textScaleMax: trackerTextScaleMax,
            padding: Math.max(6, toNumber(rawParameters["Tracker Padding"], 18)),
            titleFontSize: Math.max(10, toNumber(rawParameters["Tracker Title Font Size"], 22)),
            objectiveFontSize: Math.max(10, toNumber(rawParameters["Tracker Objective Font Size"], 20)),
            lineSpacing: Math.max(0, toNumber(rawParameters["Tracker Line Spacing"], 4))
        },
        questLogBackground: {
            image: String(rawParameters["Quest Log Background Image"] || "").trim(),
            scaleMode: normalizeScaleMode(rawParameters["Quest Log Background Scale Mode"], BACKGROUND_SCALE_MODES.CONTAIN)
        },
        questLogWindow: {
            windowOpacity: clamp(toNumber(rawParameters["Quest Log Window Opacity"], 255), 0, 255),
            backgroundOpacity: clamp(toNumber(rawParameters["Quest Log Background Opacity"], 255), 0, 255)
        },
        sounds: {
            questComplete: String(rawParameters["Quest Complete SE"] || "Victory1"),
            objectiveComplete: String(rawParameters["Objective Complete SE"] || "Item3"),
            questFailed: String(rawParameters["Quest Failed SE"] || "Buzzer1")
        },
        notifications: {
            enabled: toBoolean(rawParameters["Show Notifications"], true),
            x: toNumber(rawParameters["Notification Window X"], -1),
            y: Math.max(0, toNumber(rawParameters["Notification Window Y"], 24)),
            width: Math.max(200, toNumber(rawParameters["Notification Window Width"], 520)),
            height: Math.max(40, toNumber(rawParameters["Notification Window Height"], 72)),
            duration: Math.max(30, toNumber(rawParameters["Notification Duration"], 180)),
            windowOpacity: clamp(toNumber(rawParameters["Notification Window Opacity"], 255), 0, 255),
            backgroundOpacity: clamp(toNumber(rawParameters["Notification Background Opacity"], 255), 0, 255),
            fontSize: Math.max(0, toNumber(rawParameters["Notification Font Size"], 0)),
            text: {
                objectiveComplete: String(rawParameters["Objective Complete Text"] || "Цель выполнена: %1\n%2"),
                questComplete: String(rawParameters["Quest Complete Text"] || "Квест завершен: %1"),
                questFailed: String(rawParameters["Quest Failed Text"] || "Квест провален: %1")
            },
            showIcon: toBoolean(rawParameters["Show Quest Icon In Notification"], true)
        }
    };

    const STATUS = Object.freeze({
        HIDDEN: "hidden",
        AVAILABLE: "available",
        ACTIVE: "active",
        COMPLETED: "completed",
        FAILED: "failed"
    });

    const STATUS_ORDER = Object.freeze({
        [STATUS.ACTIVE]: 1,
        [STATUS.AVAILABLE]: 2,
        [STATUS.COMPLETED]: 3,
        [STATUS.FAILED]: 4,
        [STATUS.HIDDEN]: 5
    });

    const STATUS_LABELS = Object.freeze({
        [STATUS.HIDDEN]: "Скрыт",
        [STATUS.AVAILABLE]: "Доступен",
        [STATUS.ACTIVE]: "Активен",
        [STATUS.COMPLETED]: "Завершен",
        [STATUS.FAILED]: "Провален"
    });

    const STATUS_COLOR_INDEX = Object.freeze({
        [STATUS.HIDDEN]: 0,
        [STATUS.AVAILABLE]: 0,
        [STATUS.ACTIVE]: 17,
        [STATUS.COMPLETED]: 24,
        [STATUS.FAILED]: 18
    });

    const statusIconIndex = (status) => {
        switch (status) {
            case STATUS.AVAILABLE:
                return QuestSystemParams.icons.available;
            case STATUS.ACTIVE:
                return QuestSystemParams.icons.active;
            case STATUS.COMPLETED:
                return QuestSystemParams.icons.completed;
            case STATUS.FAILED:
                return QuestSystemParams.icons.failed;
            default:
                return 0;
        }
    };

    const statusTextColor = (status) => {
        switch (status) {
            case STATUS.ACTIVE:
                return ColorManager.crisisColor ? ColorManager.crisisColor() : ColorManager.systemColor();
            case STATUS.COMPLETED:
                return ColorManager.powerUpColor ? ColorManager.powerUpColor() : ColorManager.textColor(3);
            case STATUS.FAILED:
                return ColorManager.deathColor ? ColorManager.deathColor() : ColorManager.textColor(10);
            case STATUS.AVAILABLE:
            case STATUS.HIDDEN:
            default:
                return ColorManager.normalColor();
        }
    };

    const questDisplayTitle = (quest) => {
        if (!quest) {
            return "";
        }
        return quest.title && quest.title.length ? quest.title : quest.id;
    };

    const questDescriptionForStatus = (quest) => {
        if (!quest) {
            return "";
        }
        const fallback = quest.description || "";
        if (quest.status === STATUS.AVAILABLE) {
            if (quest.showAvailableMainDescription === false && quest.availableDescription) {
                const result = quest.availableDescription;
                return (typeof QuestManager !== "undefined" && QuestManager && typeof QuestManager.renderDecoratedText === "function")
                    ? QuestManager.renderDecoratedText(result, { hideDefaultCounts: true })
                    : result;
            }
        } else if (quest.status === STATUS.COMPLETED) {
            if (quest.showCompletedMainDescription === false && quest.completedDescription) {
                const result = quest.completedDescription;
                return (typeof QuestManager !== "undefined" && QuestManager && typeof QuestManager.renderDecoratedText === "function")
                    ? QuestManager.renderDecoratedText(result, { hideDefaultCounts: true })
                    : result;
            }
        } else if (quest.status === STATUS.FAILED) {
            if (quest.showFailedMainDescription === false && quest.failedDescription) {
                const result = quest.failedDescription;
                return (typeof QuestManager !== "undefined" && QuestManager && typeof QuestManager.renderDecoratedText === "function")
                    ? QuestManager.renderDecoratedText(result, { hideDefaultCounts: true })
                    : result;
            }
        }
        return (typeof QuestManager !== "undefined" && QuestManager && typeof QuestManager.renderDecoratedText === "function")
            ? QuestManager.renderDecoratedText(fallback, { hideDefaultCounts: true })
            : fallback;
    };

    const QuestManager = (function() {
        const manager = {};

        manager._playtest = Utils.isOptionValid("test");
    manager._settingUp = false;

        manager.reportError = function(message) {
            if (this._playtest) {
                console.error(`[${pluginName}] Error: ${message}`);
            }
        };

        manager.reportWarning = function(message) {
            if (this._playtest) {
                console.warn(`[${pluginName}] Warning: ${message}`);
            }
        };

        manager.normalizeStatus = function(status, defaultStatus = STATUS.HIDDEN) {
            const value = String(status ?? "").toLowerCase();
            if (Object.values(STATUS).includes(value)) {
                return value;
            }
            return defaultStatus;
        };

        manager.normalizeObjective = function(objective, index, seen) {
            const source = objective || {};
            let objectiveId = String(source.id ?? source.objectiveId ?? "").trim();
            if (!objectiveId) {
                objectiveId = `obj_${index + 1}`;
            }
            if (seen.has(objectiveId)) {
                let suffix = 2;
                let candidate = `${objectiveId}_${suffix}`;
                while (seen.has(candidate)) {
                    suffix += 1;
                    candidate = `${objectiveId}_${suffix}`;
                }
                this.reportWarning(`Objective ID '${objectiveId}' уже существует, создан '${candidate}'.`);
                objectiveId = candidate;
            }
            seen.add(objectiveId);

            const text = decodeText(source.text ?? source.description ?? "");
            const trackerText = decodeText(source.trackerText ?? "");
            const hidden = toBoolean(source.hidden, false);
            const sourceTargets = Array.isArray(source.trackingTargets) && source.trackingTargets.length > 0
                ? source.trackingTargets
                : parseTrackingTargets(text);
            const baselineSource = source.trackingBaselines && typeof source.trackingBaselines === "object"
                ? source.trackingBaselines
                : {};
            const trackingBaselines = {};
            const trackingTargets = sourceTargets
                .map((target) => {
                    const typeRaw = String(target.type ?? target.tokenType ?? target.kind ?? "").toUpperCase();
                    const normalizedType = typeRaw === "I" ? "IT" : typeRaw;
                    const id = Number(target.id ?? target.targetId ?? target.itemId ?? target.enemyId ?? 0);
                    const amount = Number(target.amount ?? target.required ?? target.count ?? target.value ?? 0);
                    return {
                        type: normalizedType,
                        id,
                        amount
                    };
                })
                .filter((target) => Number.isFinite(target.id) && target.id > 0 && ["IT", "W", "A", "E"].includes(target.type))
                .map((target) => ({
                    type: target.type,
                    id: target.id,
                    amount: target.amount > 0 ? target.amount : 1
                }));

            Object.keys(baselineSource).forEach((key) => {
                const numeric = Number(baselineSource[key]);
                if (Number.isFinite(numeric)) {
                    trackingBaselines[key] = numeric;
                }
            });

            return {
                id: objectiveId,
                text,
                trackerText,
                hidden,
                completed: !!source.completed,
                trackingTargets,
                trackingBaselines,
                autoTracking: trackingTargets.length > 0,
                onCompleteCommonEvent: toNumber(source.onCompleteCommonEvent, 0),
                onCompleteSwitch: toNumber(source.onCompleteSwitch, 0),
                onCompleteVariable: toNumber(source.onCompleteVariable, 0),
                onCompleteVariableOp: String(source.onCompleteVariableOp || "set").trim(),
                onCompleteVariableValue: toNumber(source.onCompleteVariableValue, 1)
            };
        };

        manager.createQuestInstance = function(questData, options = {}) {
            const timestamp = Date.now();
            const predefined = !!options.predefined;
            const baseInitial = this.normalizeStatus(questData.initialStatus, STATUS.HIDDEN);
            const initialStatus = this.normalizeStatus(options.initialStatus ?? baseInitial, STATUS.HIDDEN);
            const status = this.normalizeStatus(options.status ?? initialStatus, initialStatus);
            const defaultActivation = baseInitial === STATUS.HIDDEN ? STATUS.AVAILABLE : baseInitial;
            const activationStatus = this.normalizeStatus(
                options.activationStatus ?? questData.activationStatus ?? defaultActivation,
                STATUS.AVAILABLE
            );

            const objectivesSource = Array.isArray(questData.objectives) ? questData.objectives : [];
            const seen = new Set();
            const objectives = objectivesSource.map((objective, index) =>
                this.normalizeObjective(objective, index, seen)
            );

            const showAvailableMainDescription = questData.showAvailableMainDescription !== undefined
                ? !!questData.showAvailableMainDescription
                : true;
            const availableDescription = typeof questData.availableDescription === "string"
                ? questData.availableDescription
                : "";
            const showCompletedMainDescription = questData.showCompletedMainDescription !== undefined
                ? !!questData.showCompletedMainDescription
                : true;
            const completedDescription = typeof questData.completedDescription === "string"
                ? questData.completedDescription
                : "";
            const showFailedMainDescription = questData.showFailedMainDescription !== undefined
                ? !!questData.showFailedMainDescription
                : true;
            const failedDescription = typeof questData.failedDescription === "string"
                ? questData.failedDescription
                : "";

            const tracked = options.tracked ?? !!questData.tracked;
            const trackedAt = tracked
                ? (typeof questData.trackedAt === "number" ? questData.trackedAt : timestamp)
                : null;

            return {
                id: questData.id,
                title: questData.title ?? "",
                categoryId: questData.categoryId ?? "main",
                description: questData.description ?? "",
                questGiver: questData.questGiver ?? "",
                location: questData.location ?? "",
                objectives,
                reward: questData.reward ?? "",
                showAvailableMainDescription,
                availableDescription,
                showCompletedMainDescription,
                completedDescription,
                showFailedMainDescription,
                failedDescription,
                status,
                initialStatus,
                activationStatus,
                tracked,
                trackedAt,
                predefined,
                createdAt: timestamp,
                updatedAt: timestamp,
                autoProgressObjectives: toBoolean(questData.autoProgressObjectives, false),
                currentObjectiveIndex: 0,
                onCompleteCommonEvent: toNumber(questData.onCompleteCommonEvent, 0),
                onCompleteSwitch: toNumber(questData.onCompleteSwitch, 0),
                onCompleteVariable: toNumber(questData.onCompleteVariable, 0),
                onCompleteVariableOp: String(questData.onCompleteVariableOp || "set").trim(),
                onCompleteVariableValue: toNumber(questData.onCompleteVariableValue, 1),
                onFailCommonEvent: toNumber(questData.onFailCommonEvent, 0),
                onFailSwitch: toNumber(questData.onFailSwitch, 0),
                onFailVariable: toNumber(questData.onFailVariable, 0),
                onFailVariableOp: String(questData.onFailVariableOp || "set").trim(),
                onFailVariableValue: toNumber(questData.onFailVariableValue, 1)
            };
        };

        manager.initialize = function() {
            this._predefinedQuestMap = new Map();
            this._customCategories = [];
            this._gameSystem = null;
            this._playtest = Utils.isOptionValid("test");
            this._isLoadingFromSave = false; // Флаг для предотвращения триггеров при загрузке
            this.reloadParameters();
        };

        manager.reloadParameters = function() {
            this._predefinedQuestMap.clear();

            QuestSystemParams.predefinedQuests.forEach((quest) => {
                if (!quest.id) {
                    this.reportWarning("Предустановленный квест без ID пропущен.");
                    return;
                }
                if (this._predefinedQuestMap.has(quest.id)) {
                    this.reportError(`Предустановленный квест с ID '${quest.id}' уже существует.`);
                    return;
                }

                const normalizedInitial = this.normalizeStatus(quest.initialStatus, STATUS.HIDDEN);
                const activationStatus = this.normalizeStatus(
                    quest.activationStatus ?? (normalizedInitial === STATUS.HIDDEN ? STATUS.AVAILABLE : normalizedInitial),
                    STATUS.AVAILABLE
                );

                const questCopy = deepClone({
                    ...quest,
                    initialStatus: normalizedInitial,
                    activationStatus
                });

                if (!Array.isArray(questCopy.objectives)) {
                    questCopy.objectives = [];
                }

                this._predefinedQuestMap.set(quest.id, questCopy);
            });

            this._customCategories = QuestSystemParams.customCategories
                .filter((category) => !!category.id)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((category) => ({ ...category }));

            if (this._gameSystem) {
                this.syncPredefinedQuests({ includeHidden: false });
            }
            requestTrackerRefresh();
        };

        manager.createEmptyQuestSystem = function() {
            const timestamp = Date.now();
            return {
                quests: {},
                killCounts: {},
                version: 1,
                createdAt: timestamp,
                updatedAt: timestamp
            };
        };

        manager.migrateSaveData = function(data) {
            if (!data.quests) {
                data.quests = {};
            }
            if (!data.version) {
                data.version = 1;
            }
            if (!data.createdAt) {
                data.createdAt = Date.now();
            }
            if (!data.updatedAt) {
                data.updatedAt = Date.now();
            }
            if (!data.killCounts || typeof data.killCounts !== "object") {
                data.killCounts = {};
            }
            Object.values(data.quests).forEach((quest) => {
                if (!quest) {
                    return;
                }
                if (typeof quest.showAvailableMainDescription !== "boolean") {
                    quest.showAvailableMainDescription = true;
                }
                if (typeof quest.availableDescription !== "string") {
                    quest.availableDescription = "";
                }
                if (typeof quest.showCompletedMainDescription !== "boolean") {
                    quest.showCompletedMainDescription = true;
                }
                if (typeof quest.completedDescription !== "string") {
                    quest.completedDescription = "";
                }
                if (typeof quest.showFailedMainDescription !== "boolean") {
                    quest.showFailedMainDescription = true;
                }
                if (typeof quest.failedDescription !== "string") {
                    quest.failedDescription = "";
                }
                if (typeof quest.tracked !== "boolean") {
                    quest.tracked = false;
                }
                if (quest.tracked) {
                    quest.trackedAt = typeof quest.trackedAt === "number" ? quest.trackedAt : Date.now();
                } else {
                    quest.trackedAt = null;
                }
                // Миграция для новых параметров событий квеста
                if (typeof quest.onCompleteCommonEvent !== "number") {
                    quest.onCompleteCommonEvent = 0;
                }
                if (typeof quest.onCompleteSwitch !== "number") {
                    quest.onCompleteSwitch = 0;
                }
                if (typeof quest.onCompleteVariable !== "number") {
                    quest.onCompleteVariable = 0;
                }
                if (typeof quest.onCompleteVariableOp !== "string") {
                    quest.onCompleteVariableOp = "set";
                }
                if (typeof quest.onCompleteVariableValue !== "number") {
                    quest.onCompleteVariableValue = 1;
                }
                if (typeof quest.onFailCommonEvent !== "number") {
                    quest.onFailCommonEvent = 0;
                }
                if (typeof quest.onFailSwitch !== "number") {
                    quest.onFailSwitch = 0;
                }
                if (typeof quest.onFailVariable !== "number") {
                    quest.onFailVariable = 0;
                }
                if (typeof quest.onFailVariableOp !== "string") {
                    quest.onFailVariableOp = "set";
                }
                if (typeof quest.onFailVariableValue !== "number") {
                    quest.onFailVariableValue = 1;
                }
                if (typeof quest.autoProgressObjectives !== "boolean") {
                    quest.autoProgressObjectives = false;
                }
                if (typeof quest.currentObjectiveIndex !== "number") {
                    quest.currentObjectiveIndex = 0;
                }
                if (!Array.isArray(quest.objectives)) {
                    quest.objectives = [];
                } else {
                    const seen = new Set();
                    quest.objectives = quest.objectives.map((objective, index) =>
                        this.normalizeObjective(objective, index, seen)
                    );
                }
            });
        };

        manager.setupGameSystem = function(gameSystem) {
            if (!gameSystem || this._settingUp) {
                return;
            }
            this._settingUp = true;
            try {
                const needsInit = !gameSystem._questSystem;
                this._gameSystem = gameSystem;
                if (needsInit) {
                    this._gameSystem._questSystem = this.createEmptyQuestSystem();
                }
                this.migrateSaveData(this._gameSystem._questSystem);
                this.syncPredefinedQuests({ includeHidden: false });
                this.refreshAutoTrackedObjectives();
                requestTrackerRefresh();
            } finally {
                this._settingUp = false;
            }
        };

        manager.ensureRuntime = function() {
            if (typeof $gameSystem === "undefined" || !$gameSystem) {
                return;
            }
            if (this._settingUp) {
                return;
            }
            if (this._gameSystem === $gameSystem && this._gameSystem._questSystem) {
                return;
            }
            this.setupGameSystem($gameSystem);
        };

        manager.syncPredefinedQuests = function({ includeHidden = false } = {}) {
            if (!this._predefinedQuestMap) {
                return;
            }
            const questMap = this.questMap();
            let changed = false;

            this._predefinedQuestMap.forEach((questData) => {
                if (!questData.id) {
                    return;
                }
                
                if (!questMap[questData.id]) {
                    // Квест ещё не существует - создаём
                    if (includeHidden || questData.initialStatus !== STATUS.HIDDEN) {
                        questMap[questData.id] = this.createQuestInstance(questData, {
                            predefined: true,
                            status: questData.initialStatus,
                            activationStatus: questData.activationStatus
                        });
                        changed = true;
                    }
                } else {
                    // Квест уже существует - обновляем метаданные
                    const quest = questMap[questData.id];
                    quest.predefined = true;
                    quest.initialStatus = this.normalizeStatus(questData.initialStatus, STATUS.HIDDEN);
                    quest.activationStatus = this.normalizeStatus(
                        questData.activationStatus ?? (quest.initialStatus === STATUS.HIDDEN ? STATUS.AVAILABLE : quest.initialStatus),
                        STATUS.AVAILABLE
                    );
                    quest.showAvailableMainDescription = questData.showAvailableMainDescription;
                    quest.availableDescription = questData.availableDescription;
                    quest.showCompletedMainDescription = questData.showCompletedMainDescription;
                    quest.completedDescription = questData.completedDescription;
                    quest.showFailedMainDescription = questData.showFailedMainDescription;
                    quest.failedDescription = questData.failedDescription;
                }
            });

            if (changed) {
                this.touchGameData();
                requestTrackerRefresh();
            }
        };

        manager.gameData = function() {
            return this._gameSystem ? this._gameSystem._questSystem : null;
        };

        manager.questMap = function() {
            const data = this.gameData();
            if (!data) {
                return {};
            }
            return data.quests;
        };

        manager.listQuests = function() {
            return Object.values(this.questMap());
        };

        manager.touchGameData = function() {
            const data = this.gameData();
            if (data) {
                data.updatedAt = Date.now();
            }
        };

        manager.touchQuest = function(quest) {
            if (quest) {
                quest.updatedAt = Date.now();
                this.touchGameData();
                requestTrackerRefresh();
            }
        };

        manager.getQuestInternal = function(questId) {
            if (!questId) {
                return undefined;
            }
            return this.questMap()[questId];
        };

        manager.hasQuest = function(questId) {
            return !!this.getQuestInternal(questId);
        };

        manager.getQuest = function(questId) {
            const quest = this.getQuestInternal(questId);
            return quest ? deepClone(quest) : undefined;
        };

        manager.hasPredefinedQuest = function(questId) {
            return this._predefinedQuestMap.has(questId);
        };

        manager.getPredefinedQuest = function(questId) {
            if (!questId) {
                return undefined;
            }
            const quest = this._predefinedQuestMap.get(questId);
            return quest ? deepClone(quest) : undefined;
        };

        manager.getPredefinedQuestData = function(questId) {
            return this.getPredefinedQuest(questId);
        };

        manager.categoryQuestCount = function(categoryId, { includeHidden = true } = {}) {
            return this.listQuests().filter((quest) => {
                if (quest.categoryId !== categoryId) {
                    return false;
                }
                if (!includeHidden && quest.status === STATUS.HIDDEN) {
                    return false;
                }
                return true;
            }).length;
        };

        manager.ensureQuestCapacity = function(categoryId) {
            const limit = QuestSystemParams.maxQuestsPerCategory;
            if (!limit || limit <= 0) {
                return true;
            }
            const count = this.categoryQuestCount(categoryId, { includeHidden: true });
            if (count >= limit) {
                this.reportWarning(`Категория '${categoryId}' достигла лимита (${limit}).`);
                return false;
            }
            return true;
        };

        manager.isQuestTracked = function(questId) {
            const quest = this.getQuestInternal(questId);
            return quest ? !!quest.tracked : false;
        };

        manager.setQuestTracked = function(questId, tracked) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для изменения отслеживания.`);
                return null;
            }
            
            // Можно трекать только активные квесты
            if (tracked && quest.status !== STATUS.ACTIVE) {
                this.reportWarning(`setQuestTracked: квест "${questId}" не активен (статус: ${quest.status}). Отслеживание невозможно.`);
                return null;
            }
            
            const desired = !!tracked;
            if (quest.tracked === desired) {
                if (desired && !quest.trackedAt) {
                    quest.trackedAt = Date.now();
                    this.touchQuest(quest);
                }
                return quest.tracked;
            }
            
            if (desired) {
                // Проверяем лимит отслеживаемых квестов
                const maxTracked = QuestSystemParams.tracker.maxEntries;
                const currentTracked = this.getTrackedQuestIds();
                
                if (currentTracked.length >= maxTracked) {
                    // Снимаем отслеживание с самого старого квеста
                    const trackedQuests = currentTracked
                        .map(id => this.getQuestInternal(id))
                        .filter(q => q && q.tracked)
                        .sort((a, b) => (a.trackedAt || 0) - (b.trackedAt || 0));
                    
                    if (trackedQuests.length > 0) {
                        const oldestQuest = trackedQuests[0];
                        oldestQuest.tracked = false;
                        oldestQuest.trackedAt = null;
                        this.touchQuest(oldestQuest);
                    }
                }
            }
            
            quest.tracked = desired;
            quest.trackedAt = desired ? Date.now() : null;
            this.touchQuest(quest);
            requestTrackerRefresh();
            return quest.tracked;
        };

        manager.trackQuest = function(questId) {
            return this.setQuestTracked(questId, true);
        };

        manager.untrackQuest = function(questId) {
            return this.setQuestTracked(questId, false);
        };

        manager.toggleQuestTracking = function(questId) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для переключения отслеживания.`);
                return null;
            }
            return this.setQuestTracked(questId, !quest.tracked);
        };

        manager.checkAutoProgressObjectives = function(quest) {
            if (!quest || !quest.autoProgressObjectives || !Array.isArray(quest.objectives) || quest.objectives.length === 0) {
                return false;
            }

            let changed = false;
            const currentIndex = quest.currentObjectiveIndex || 0;
            
            // СНАЧАЛА проверяем откат для всех завершённых целей до текущей
            if (currentIndex > 0) {
                for (let i = currentIndex - 1; i >= 0; i--) {
                    const prevObjective = quest.objectives[i];
                    
                    // Пропускаем незавершённые или цели без автотрекинга
                    if (!prevObjective || !prevObjective.completed || !prevObjective.autoTracking) {
                        continue;
                    }
                    
                    const prevTargets = prevObjective.trackingTargets || [];
                    if (prevTargets.length === 0) {
                        continue;
                    }
                    
                    // Проверяем всё ли ещё выполнена эта предыдущая цель
                    const prevAllMet = prevTargets.every((target) => {
                        const info = this.resolveTrackingToken(target.type, target.id, target.amount, prevObjective);
                        const currentRaw = info ? (info.currentRaw ?? info.current ?? 0) : 0;
                        const baseline = prevObjective.trackingBaselines?.[makeTrackingKey(target.type, target.id)] ?? 0;
                        const progress = Math.max(0, currentRaw - baseline);
                        return progress >= target.amount;
                    });
                    
                    // Если предыдущая цель больше не выполнена - откатываем к ней
                    if (!prevAllMet) {
                        prevObjective.completed = false;
                        quest.currentObjectiveIndex = i;
                        changed = true;
                        return changed; // Сразу выходим после отката
                    }
                }
            }
            
            // Проверяем текущую активную цель
            if (currentIndex < quest.objectives.length) {
                const currentObjective = quest.objectives[currentIndex];
                
                // Переключаем на следующую цель если текущая выполнена
                if (currentObjective && currentObjective.completed) {
                    const nextIndex = currentIndex + 1;
                    if (nextIndex < quest.objectives.length) {
                        const nextObjective = quest.objectives[nextIndex];
                        
                        // Открываем следующую цель если она скрыта
                        if (nextObjective && nextObjective.hidden) {
                            nextObjective.hidden = false;
                            changed = true;
                        }
                        
                        // Переключаем индекс текущей цели
                        quest.currentObjectiveIndex = nextIndex;
                        changed = true;
                    }
                }
            }

            return changed;
        };

        manager.refreshAutoTrackedObjectives = function() {
            if (!this._gameSystem || !this._gameSystem._questSystem) {
                return false;
            }
            const quests = this.listQuests();
            let anyChanges = false;

            quests.forEach((quest) => {
                if (!quest || !Array.isArray(quest.objectives) || quest.objectives.length === 0) {
                    return;
                }
                
                // ВАЖНО: обновляем прогресс ТОЛЬКО для активных квестов
                if (quest.status !== "active") {
                    return;
                }
                
                const newlyCompleted = [];
                let questChanged = false;

                // СНАЧАЛА проверяем откат (для квестов с автопрогрессией)
                if (quest.autoProgressObjectives) {
                    const rollbackHappened = this.checkAutoProgressObjectives(quest);
                    if (rollbackHappened) {
                        questChanged = true;
                    }
                }

                // Если включено автопереключение целей, проверяем только текущую активную цель
                const objectivesToCheck = quest.autoProgressObjectives
                    ? [quest.objectives[quest.currentObjectiveIndex || 0]].filter(Boolean)
                    : quest.objectives;

                objectivesToCheck.forEach((objective) => {
                    if (!objective || !objective.autoTracking || !Array.isArray(objective.trackingTargets) || objective.trackingTargets.length === 0) {
                        return;
                    }
                    if (!objective.trackingBaselines || typeof objective.trackingBaselines !== "object") {
                        objective.trackingBaselines = {};
                    }
                    // Инициализируем localKillCounts если нужно
                    if (!objective.localKillCounts) {
                        objective.localKillCounts = {};
                    }
                    const targets = objective.trackingTargets;
                    const allMet = targets.every((target) => {
                        const key = makeTrackingKey(target.type, target.id);
                        const info = this.resolveTrackingToken(target.type, target.id, target.amount, objective);
                        const currentRaw = info ? (info.currentRaw ?? info.current ?? 0) : 0;
                        if (objective.trackingBaselines[key] === undefined && target.type === "E") {
                            objective.trackingBaselines[key] = currentRaw;
                            questChanged = true;
                        }
                        const baseline = objective.trackingBaselines[key] ?? 0;
                        const progress = Math.max(0, currentRaw - baseline);
                        return progress >= target.amount;
                    });
                    
                    // Проверяем изменение статуса
                    // При загрузке НЕ меняем статус целей - используем статус из сохранения
                    if (!this._isLoadingFromSave) {
                        const wasCompleted = objective.completed;
                        if (objective.completed !== allMet) {
                            objective.completed = allMet;
                            questChanged = true;
                            // Добавляем в список только НОВЫХ выполненных
                            if (allMet && !wasCompleted) {
                                newlyCompleted.push(objective);
                            }
                        }
                    }
                });

                if (questChanged) {
                    const statusChanged = this.autoUpdateStatusAfterObjectiveChange(quest);
                    this.touchQuest(quest);
                    
                    // Вызываем триггеры только для НОВЫХ завершений (не при загрузке)
                    if (!this._isLoadingFromSave) {
                        newlyCompleted.forEach((objective) => this.handleObjectiveCompleted(quest, objective));
                    }
                    
                    // Проверяем переключение на следующую цель ПОСЛЕ обновления статуса
                    if (quest.autoProgressObjectives) {
                        const progressChanged = this.checkAutoProgressObjectives(quest);
                        if (progressChanged) {
                            this.touchQuest(quest);
                        }
                    }
                    
                    // Вызываем триггеры завершения квеста только если это НОВОЕ завершение (не при загрузке)
                    if (statusChanged && quest.status === STATUS.COMPLETED && !this._isLoadingFromSave) {
                        this.handleQuestCompletion(quest);
                    }
                    anyChanges = true;
                }
            });

            return anyChanges;
        };

        manager.setObjectiveHidden = function(questId, objectiveId, hidden) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для изменения цели.`);
                return false;
            }
            if (!Array.isArray(quest.objectives)) {
                this.reportWarning(`У квеста '${questId}' отсутствует список целей.`);
                return false;
            }
            const objective = quest.objectives.find((obj) => obj && obj.id === objectiveId);
            if (!objective) {
                this.reportWarning(`Цель '${objectiveId}' не найдена в квесте '${questId}'.`);
                return false;
            }
            const desired = !!hidden;
            if (objective.hidden === desired) {
                return objective.hidden;
            }
            objective.hidden = desired;
            this.touchQuest(quest);
            return objective.hidden;
        };

        manager.setObjectiveAutoTracking = function(questId, objectiveId, autoTracking) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для изменения автотрекинга цели.`);
                return false;
            }
            if (!Array.isArray(quest.objectives)) {
                this.reportWarning(`У квеста '${questId}' отсутствует список целей.`);
                return false;
            }
            const objective = quest.objectives.find((obj) => obj && obj.id === objectiveId);
            if (!objective) {
                this.reportWarning(`Цель '${objectiveId}' не найдена в квесте '${questId}'.`);
                return false;
            }
            const desired = !!autoTracking;
            if (objective.autoTracking === desired) {
                return objective.autoTracking;
            }
            objective.autoTracking = desired;
            
            // Если включили autoTracking, нужно перепарсить токены
            if (desired) {
                objective.trackingTargets = this.parseTrackingTargets(objective.text);
            } else {
                // Если выключили, очищаем токены
                objective.trackingTargets = [];
            }
            
            this.touchQuest(quest);
            requestTrackerRefresh();
            return objective.autoTracking;
        };

        manager.setObjectiveCompleted = function(questId, objectiveId, completed) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для изменения статуса цели.`);
                return false;
            }
            if (!Array.isArray(quest.objectives)) {
                this.reportWarning(`У квеста '${questId}' отсутствует список целей.`);
                return false;
            }
            const objective = quest.objectives.find((obj) => obj && obj.id === objectiveId);
            if (!objective) {
                this.reportWarning(`Цель '${objectiveId}' не найдена в квесте '${questId}'.`);
                return false;
            }
            const desired = !!completed;
            if (objective.completed === desired) {
                return objective.completed;
            }
            objective.completed = desired;
            
            // Если цель выполнена - запускаем события
            if (desired) {
                this.handleObjectiveCompleted(quest, objective);
            }
            
            // Проверяем автопереключение целей
            if (quest.autoProgressObjectives) {
                this.checkAutoProgressObjectives(quest);
            }
            
            // Проверяем общий статус квеста
            const statusChanged = this.autoUpdateStatusAfterObjectiveChange(quest);
            if (statusChanged && quest.status === STATUS.COMPLETED) {
                this.handleQuestCompletion(quest);
            } else if (statusChanged && quest.status === STATUS.FAILED) {
                this.handleQuestFailed(quest);
            }
            
            this.touchQuest(quest);
            requestTrackerRefresh();
            return objective.completed;
        };

        manager.getTrackedQuestIds = function() {
            return this.listQuests()
                .filter((quest) => quest.tracked)
                .sort((a, b) => {
                    const at = a.trackedAt ?? 0;
                    const bt = b.trackedAt ?? 0;
                    if (at !== bt) {
                        return at - bt;
                    }
                    return a.id.localeCompare(b.id);
                })
                .map((quest) => quest.id);
        };

        manager.getTrackedQuests = function() {
            return this.listQuests()
                .filter((quest) => quest.tracked)
                .sort((a, b) => {
                    const at = a.trackedAt ?? 0;
                    const bt = b.trackedAt ?? 0;
                    if (at !== bt) {
                        return at - bt;
                    }
                    return a.id.localeCompare(b.id);
                })
                .map((quest) => deepClone(quest));
        };

        manager.addQuest = function(payload) {
            if (!payload || !payload.id) {
                this.reportError("Нельзя добавить квест без ID.");
                return false;
            }
            const questId = String(payload.id).trim();
            if (!questId) {
                this.reportError("Нельзя добавить квест с пустым ID.");
                return false;
            }
            if (this.hasQuest(questId)) {
                this.reportWarning(`Квест с ID '${questId}' уже существует.`);
                return false;
            }

            const trackedFlag = toBoolean(
                payload.tracked !== undefined ? payload.tracked :
                (payload.trackOnCreate !== undefined ? payload.trackOnCreate :
                (payload.autoTrack !== undefined ? payload.autoTrack : false))
            );

            const initialStatus = this.normalizeStatus(payload.initialStatus ?? payload.status ?? STATUS.HIDDEN, STATUS.HIDDEN);
            const questData = {
                id: questId,
                title: decodeText(payload.title ?? ""),
                categoryId: String(payload.categoryId ?? "main").trim() || "main",
                description: decodeText(payload.description ?? ""),
                questGiver: decodeText(payload.questGiver ?? ""),
                location: decodeText(payload.location ?? ""),
                objectives: Array.isArray(payload.objectives) ? payload.objectives : [],
                reward: decodeText(payload.reward ?? ""),
                showAvailableMainDescription: toBoolean(payload.showAvailableMainDescription, true),
                availableDescription: decodeText(payload.availableDescription ?? ""),
                showCompletedMainDescription: toBoolean(payload.showCompletedMainDescription, true),
                completedDescription: decodeText(payload.completedDescription ?? ""),
                showFailedMainDescription: toBoolean(payload.showFailedMainDescription, true),
                failedDescription: decodeText(payload.failedDescription ?? ""),
                tracked: trackedFlag,
                trackedAt: null,
                initialStatus,
                activationStatus: this.normalizeStatus(payload.activationStatus ?? initialStatus, STATUS.AVAILABLE)
            };

            if (!questData.objectives.length) {
                this.reportWarning(`Квест '${questId}' добавлен без целей.`);
            }

            if (!this.ensureQuestCapacity(questData.categoryId)) {
                return false;
            }

            const quest = this.createQuestInstance(questData, {
                predefined: !!payload.predefined,
                status: initialStatus,
                activationStatus: questData.activationStatus,
                tracked: questData.tracked
            });

            this.questMap()[quest.id] = quest;
            // Обновляем прогресс только если квест активен
            if (quest.status === "active") {
                this.refreshAutoTrackedObjectives();
            }
            this.touchQuest(quest);
            return true;
        };

        manager.removeQuest = function(questId) {
            if (!questId) {
                return false;
            }
            const questMap = this.questMap();
            if (!questMap[questId]) {
                this.reportWarning(`Квест '${questId}' не найден для удаления.`);
                return false;
            }
            delete questMap[questId];
            this.touchGameData();
            requestTrackerRefresh();
            return true;
        };

        manager.updateQuestStatus = function(questId, status) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для изменения статуса.`);
                return false;
            }
            const normalized = this.normalizeStatus(status, quest.status);
            if (quest.status === normalized) {
                return true;
            }
            const previousStatus = quest.status;
            quest.status = normalized;
            this.touchQuest(quest);
            
            // Если квест переходит в статус ACTIVE, сбрасываем счётчики врагов
            if (quest.status === STATUS.ACTIVE && previousStatus !== STATUS.ACTIVE) {
                this.resetQuestEnemyBaselines(quest);
            }
            
            if (quest.status === STATUS.ACTIVE) {
                this.refreshAutoTrackedObjectives();
            }
            if (normalized === STATUS.COMPLETED) {
                this.handleQuestCompletion(quest);
            } else if (normalized === STATUS.FAILED) {
                this.handleQuestFailed(quest);
            }
            return true;
        };

        manager.autoUpdateStatusAfterObjectiveChange = function(quest) {
            if (!quest.objectives.length) {
                return false;
            }
            
            // При загрузке не меняем статус автоматически - используем статус из сохранения
            if (this._isLoadingFromSave) {
                return false;
            }
            
            const allCompleted = quest.objectives.every((objective) => objective.completed);
            let changed = false;

            if (allCompleted && quest.status !== STATUS.COMPLETED && quest.status !== STATUS.FAILED) {
                quest.status = STATUS.COMPLETED;
                changed = true;
            } else if (!allCompleted && quest.status === STATUS.COMPLETED) {
                quest.status = STATUS.ACTIVE;
                changed = true;
            }
            // УДАЛЕНО: автоматическое изменение AVAILABLE -> ACTIVE
            // Квест должен оставаться AVAILABLE, пока его не активируют явно

            return changed;
        };

        manager.completeObjective = function(questId, objectiveId) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для обновления цели.`);
                return false;
            }
            const objective = quest.objectives.find((obj) => obj.id === objectiveId);
            if (!objective) {
                this.reportWarning(`Цель '${objectiveId}' не найдена в квесте '${questId}'.`);
                return false;
            }
            if (objective.completed) {
                return false;
            }
            objective.completed = true;
            const statusChanged = this.autoUpdateStatusAfterObjectiveChange(quest);
            this.touchQuest(quest);
            this.handleObjectiveCompleted(quest, objective);
            if (statusChanged && quest.status === STATUS.COMPLETED) {
                this.handleQuestCompletion(quest);
            }
            return true;
        };

        manager.addObjective = function(questId, objectiveData) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для добавления цели.`);
                return false;
            }
            const allowDuplicate = !!(objectiveData && (objectiveData.allowDuplicate || objectiveData.forceDuplicate));
            const requestedIdRaw = objectiveData ? String(objectiveData.id ?? objectiveData.objectiveId ?? "").trim() : "";
            if (!allowDuplicate && requestedIdRaw && quest.objectives.some((objective) => objective.id === requestedIdRaw)) {
                this.reportWarning(`Цель '${requestedIdRaw}' уже существует в квесте '${questId}'. Добавление пропущено.`);
                return false;
            }
            const seenIds = new Set(quest.objectives.map((objective) => objective.id));
            const normalized = this.normalizeObjective(objectiveData, quest.objectives.length, new Set(seenIds));
            const candidateSignature = [
                normalized.text || "",
                normalized.trackerText || "",
                normalized.hidden ? "1" : "0",
                serializeTrackingTargets(normalized.trackingTargets)
            ].join("|");
            const hasDuplicate = quest.objectives.some((objective) => {
                const signature = [
                    objective.text || "",
                    objective.trackerText || "",
                    objective.hidden ? "1" : "0",
                    serializeTrackingTargets(objective.trackingTargets)
                ].join("|");
                return signature === candidateSignature;
            });
            if (!allowDuplicate && hasDuplicate) {
                this.reportWarning(`Цель с таким содержимым уже есть в квесте '${questId}'. Добавление пропущено.`);
                return false;
            }
            quest.objectives.push(normalized);
            this.autoUpdateStatusAfterObjectiveChange(quest);
            this.touchQuest(quest);
            // Обновляем прогресс только если квест активен
            if (quest.status === "active") {
                this.refreshAutoTrackedObjectives();
            }
            return true;
        };

        manager.updateQuestField = function(questId, field, value) {
            const allowedFields = new Set([
                "title",
                "description",
                "questGiver",
                "location",
                "reward",
                "availableDescription",
                "completedDescription",
                "failedDescription"
            ]);
            if (!allowedFields.has(field)) {
                this.reportWarning(`Поле '${field}' нельзя обновить командой UpdateQuestField.`);
                return false;
            }
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                this.reportWarning(`Квест '${questId}' не найден для обновления поля.`);
                return false;
            }
            quest[field] = decodeText(value ?? "");
            this.touchQuest(quest);
            return true;
        };

        manager.activatePredefinedQuest = function(questId) {
            if (!questId) {
                this.reportWarning("Не указан ID квеста для активации.");
                return false;
            }
            const questData = this.getPredefinedQuest(questId);
            if (!questData) {
                this.reportWarning(`Предустановленный квест '${questId}' не найден.`);
                return false;
            }
            const questMap = this.questMap();
            let quest = questMap[questId];
            if (!quest) {
                if (!this.ensureQuestCapacity(questData.categoryId)) {
                    return false;
                }
                quest = this.createQuestInstance(questData, {
                    predefined: true,
                    status: STATUS.HIDDEN,
                    activationStatus: questData.activationStatus
                });
                questMap[questId] = quest;
            } else {
                quest.predefined = true;
            }

            const targetStatusRaw = quest.activationStatus ?? questData.activationStatus;
            const normalizedStatus = this.normalizeStatus(targetStatusRaw, STATUS.AVAILABLE);
            const previousStatus = quest.status;
            quest.status = normalizedStatus === STATUS.HIDDEN ? STATUS.AVAILABLE : normalizedStatus;
            this.touchQuest(quest);
            
            // Если квест переходит в статус ACTIVE, сбрасываем счётчики врагов
            if (quest.status === "active" && previousStatus !== "active") {
                this.resetQuestEnemyBaselines(quest);
            }
            
            // Обновляем прогресс только если квест стал активным
            if (quest.status === "active") {
                this.refreshAutoTrackedObjectives();
            }
            
            if (this._playtest) {
                console.log(`[QuestSystem] Activated quest '${questId}':`, {
                    id: quest.id,
                    title: quest.title,
                    categoryId: quest.categoryId,
                    status: quest.status,
                    objectives: quest.objectives.length
                });
            }
            
            return true;
        };

        manager.getQuestsByCategory = function(categoryId, options = {}) {
            const includeHidden = options.includeHidden ?? false;
            const includeCompleted = options.includeCompleted ?? QuestSystemParams.showCompleted;
            const includeFailed = options.includeFailed ?? QuestSystemParams.showFailed;
            const isStatusCategory =
                categoryId === SPECIAL_CATEGORY_IDS.COMPLETED || categoryId === SPECIAL_CATEGORY_IDS.FAILED;

            let quests;
            if (categoryId === SPECIAL_CATEGORY_IDS.COMPLETED) {
                quests = this.listQuests().filter((quest) => quest.status === STATUS.COMPLETED);
            } else if (categoryId === SPECIAL_CATEGORY_IDS.FAILED) {
                quests = this.listQuests().filter((quest) => quest.status === STATUS.FAILED);
            } else {
                quests = this.listQuests().filter((quest) => quest.categoryId === categoryId);
            }

            if (this._playtest) {
                console.log(`[QuestSystem] getQuestsByCategory('${categoryId}'):`, {
                    totalQuests: this.listQuests().length,
                    matchingCategory: quests.length,
                    includeHidden,
                    includeCompleted,
                    includeFailed,
                    isStatusCategory
                });
            }

            const filtered = quests.filter((quest) => {
                if (!includeHidden && quest.status === STATUS.HIDDEN) {
                    if (this._playtest) {
                        console.log(`  - Filtered out ${quest.id}: hidden`);
                    }
                    return false;
                }
                if (!isStatusCategory && !includeCompleted && quest.status === STATUS.COMPLETED) {
                    if (this._playtest) {
                        console.log(`  - Filtered out ${quest.id}: completed`);
                    }
                    return false;
                }
                if (!isStatusCategory && !includeFailed && quest.status === STATUS.FAILED) {
                    if (this._playtest) {
                        console.log(`  - Filtered out ${quest.id}: failed`);
                    }
                    return false;
                }
                return true;
            });

            if (this._playtest) {
                console.log(`  - After filtering: ${filtered.length} quests`);
            }

            return this.sortQuestsForPresentation(filtered).map((quest) => deepClone(quest));
        };

        manager.sortQuestsForPresentation = function(quests) {
            return quests.slice().sort((a, b) => {
                const orderA = STATUS_ORDER[a.status] ?? 99;
                const orderB = STATUS_ORDER[b.status] ?? 99;
                if (orderA !== orderB) {
                    return orderA - orderB;
                }
                const createdDiff = (a.createdAt ?? 0) - (b.createdAt ?? 0);
                if (createdDiff !== 0) {
                    return createdDiff;
                }
                return a.id.localeCompare(b.id);
            });
        };

        manager.getActiveQuests = function() {
            return this.listQuests()
                .filter((quest) => quest.status === STATUS.ACTIVE)
                .map((quest) => deepClone(quest));
        };

        manager.countQuestsByStatus = function(status) {
            const normalized = this.normalizeStatus(status, STATUS.HIDDEN);
            return this.listQuests().filter((quest) => quest.status === normalized).length;
        };

        manager.recordEnemyKill = function(enemyId) {
            if (!enemyId) {
                return;
            }
            
            // СНАЧАЛА обновляем прогресс квестов (может переключить активные цели)
            this.refreshAutoTrackedObjectives();
            
            // ПОТОМ записываем убийство в текущие активные цели
            const quests = this.listQuests();
            let anyChanged = false;
            
            quests.forEach((quest) => {
                // Проверяем только активные квесты
                if (quest.status !== "active" || !Array.isArray(quest.objectives)) {
                    return;
                }
                
                // Определяем какие цели должны считать убийства
                const objectivesToTrack = quest.autoProgressObjectives
                    ? [quest.objectives[quest.currentObjectiveIndex || 0]].filter(Boolean)
                    : quest.objectives;
                
                objectivesToTrack.forEach((objective) => {
                    // Проверяем, нужен ли этой цели данный враг
                    if (!objective || !objective.trackingTargets || objective.completed) {
                        return;
                    }
                    
                    const needsThisEnemy = objective.trackingTargets.some(
                        target => target.type === "E" && target.id === enemyId
                    );
                    
                    if (needsThisEnemy) {
                        // Инициализируем локальный счётчик если нужно
                        if (!objective.localKillCounts) {
                            objective.localKillCounts = {};
                        }
                        
                        // Увеличиваем счётчик убийств для этой цели
                        objective.localKillCounts[enemyId] = (objective.localKillCounts[enemyId] || 0) + 1;
                        anyChanged = true;
                    }
                });
            });
            
            if (anyChanged) {
                // Ещё раз обновляем прогресс после записи убийства
                this.refreshAutoTrackedObjectives();
                this.touchGameData();
                requestTrackerRefresh();
            }
        };

        manager.resetQuestEnemyBaselines = function(quest) {
            if (!quest || !Array.isArray(quest.objectives)) {
                return;
            }
            // Очищаем локальные счётчики убийств у всех целей
            quest.objectives.forEach((objective) => {
                if (objective && objective.localKillCounts) {
                    objective.localKillCounts = {};
                }
            });
        };

        manager.getQuestStatusLabel = function(status) {
            return STATUS_LABELS[status] || status || "";
        };

        manager.findPrimaryObjective = function(quest) {
            if (!quest || !Array.isArray(quest.objectives)) {
                return null;
            }
            
            // Если включено автопереключение, возвращаем текущую активную цель
            if (quest.autoProgressObjectives) {
                const currentIndex = quest.currentObjectiveIndex || 0;
                if (currentIndex < quest.objectives.length) {
                    const currentObj = quest.objectives[currentIndex];
                    // Возвращаем текущую цель, даже если она скрыта (откроем автоматически)
                    if (currentObj) {
                        return currentObj;
                    }
                }
            }
            
            // Стандартная логика для квестов без автопрогресса
            const visibleObjectives = quest.objectives.filter((objective) => objective && !objective.hidden);
            const incomplete = visibleObjectives.find((objective) => !objective.completed);
            if (incomplete) {
                return incomplete;
            }
            if (visibleObjectives.length > 0) {
                return visibleObjectives[0];
            }
            return null;
        };

        manager.resolveTrackingToken = function(type, id, amount, objective = null) {
            this.ensureRuntime();
            const party = typeof $gameParty !== "undefined" ? $gameParty : null;
            const typeRaw = String(type || "").toUpperCase();
            const normalizedType = typeRaw === "I" ? "IT" : typeRaw;
            const result = {
                current: 0,
                currentRaw: 0,
                amount,
                iconIndex: 0,
                name: "",
                type: normalizedType
            };

            if (!Number.isFinite(id) || id <= 0 || !["IT", "W", "A", "E"].includes(normalizedType)) {
                result.amount = amount > 0 ? amount : 1;
                return result;
            }

            const safeAmount = amount > 0 ? amount : 1;
            result.amount = safeAmount;

            let currentRaw = 0;

            switch (normalizedType) {
                case "IT": {
                    const item = $dataItems?.[id];
                    if (item) {
                        result.name = item.name;
                        result.iconIndex = item.iconIndex || 0;
                        if (party) {
                            currentRaw = party.numItems(item);
                        }
                    }
                    break;
                }
                case "W": {
                    const weapon = $dataWeapons?.[id];
                    if (weapon) {
                        result.name = weapon.name;
                        result.iconIndex = weapon.iconIndex || 0;
                        if (party) {
                            currentRaw = party.numItems(weapon);
                        }
                    }
                    break;
                }
                case "A": {
                    const armor = $dataArmors?.[id];
                    if (armor) {
                        result.name = armor.name;
                        result.iconIndex = armor.iconIndex || 0;
                        if (party) {
                            currentRaw = party.numItems(armor);
                        }
                    }
                    break;
                }
                case "E": {
                    const enemy = $dataEnemies?.[id];
                    if (enemy) {
                        result.name = enemy.name;
                        result.iconIndex = 0;
                    }
                    // Используем локальный счётчик цели если передан objective
                    if (objective && objective.localKillCounts) {
                        currentRaw = objective.localKillCounts[id] || 0;
                    } else {
                        currentRaw = 0;
                    }
                    break;
                }
                default:
                    break;
            }

            result.currentRaw = currentRaw;
            result.current = safeAmount > 0 ? clamp(currentRaw, 0, safeAmount) : currentRaw;
            result.reached = currentRaw >= safeAmount;
            return result;
        };

        manager.buildTrackingDisplay = function(info, options = {}) {
            const hideCounts = !!options.hideCounts;
            const amount = info.amount ?? 0;
            const current = amount > 0 ? clamp(info.current ?? 0, 0, amount) : (info.current ?? 0);
            const iconPart = info.iconIndex ? `\\I[${info.iconIndex}]` : "";
            const namePart = info.name || "";
            const labelPart = `${iconPart}${namePart}`;
            if (hideCounts) {
                return labelPart || namePart || iconPart || "";
            }
            if (amount > 0) {
                const numericPart = `${current}/${amount}`;
                if (labelPart) {
                    return `${numericPart} ${labelPart}`.trim();
                }
                return numericPart;
            }
            const numericPart = String(current);
            if (labelPart) {
                return `${numericPart} ${labelPart}`.trim();
            }
            return numericPart;
        };

        manager.renderObjectiveText = function(quest, objective, overrideText) {
            if (!objective) {
                return "";
            }
            const baseText = typeof overrideText === "string" && overrideText.length > 0
                ? overrideText
                : (objective.text || objective.id || "");
            if (!baseText) {
                return "";
            }
            const baselines = (objective && typeof objective.trackingBaselines === "object")
                ? objective.trackingBaselines
                : null;
            return this.renderTextWithTrackingTokens(baseText, {
                baselines,
                objective,  // Передаём objective для доступа к localKillCounts
                useEnemyBaseline: true,
                hideDefaultCounts: true
            });
        };

        manager.renderTextWithTrackingTokens = function(rawText, options = {}) {
            if (rawText === null || rawText === undefined) {
                return "";
            }
            const text = String(rawText);
            if (!text) {
                return "";
            }

            this.ensureRuntime();

            const baselines = options.baselines && typeof options.baselines === "object"
                ? options.baselines
                : null;
            const objective = options.objective || null;  // Получаем objective из опций
            const useEnemyBaseline = !!options.useEnemyBaseline;
            const hideDefaultCounts = options.hideDefaultCounts !== undefined
                ? !!options.hideDefaultCounts
                : true;

            const regex = createTrackingTokenRegex();
            return text.replace(regex, (match, amountPart, tokenType, idStr) => {
                const id = Number(idStr);
                if (!Number.isFinite(id) || id <= 0) {
                    return match;
                }
                const explicitAmount = amountPart !== undefined && amountPart !== null && amountPart.length > 0;
                const numericPart = explicitAmount ? Number(amountPart.replace(/[^\d]/g, "")) : NaN;
                const amount = Number.isFinite(numericPart) && numericPart > 0 ? numericPart : 1;
                const typeRaw = String(tokenType || "").toUpperCase();
                const typeNormalized = typeRaw === "I" ? "IT" : typeRaw;
                const info = this.resolveTrackingToken(typeNormalized, id, amount, objective);  // Передаём objective
                if (!info || !info.amount) {
                    return match;
                }
                let baseline = 0;
                if (baselines) {
                    const key = makeTrackingKey(typeNormalized, id);
                    if (Object.prototype.hasOwnProperty.call(baselines, key)) {
                        baseline = Number(baselines[key]) || 0;
                    } else if (useEnemyBaseline && typeNormalized === "E") {
                        baseline = info.currentRaw ?? 0;
                    }
                } else if (useEnemyBaseline && typeNormalized === "E") {
                    baseline = info.currentRaw ?? 0;
                }
                const rawCurrent = info.currentRaw ?? 0;
                const progress = Math.max(0, rawCurrent - baseline);
                const displayCurrent = amount > 0 ? clamp(progress, 0, amount) : progress;
                const displayInfo = {
                    ...info,
                    baseline,
                    progress,
                    current: displayCurrent
                };
                const hideCounts = hideDefaultCounts && !explicitAmount;
                return this.buildTrackingDisplay(displayInfo, { hideCounts });
            });
        };

        manager.renderDecoratedText = function(rawText, options = {}) {
            return this.renderTextWithTrackingTokens(rawText, {
                hideDefaultCounts: options.hideDefaultCounts ?? true,
                useEnemyBaseline: options.useEnemyBaseline ?? false,
                baselines: options.baselines
            });
        };

        manager.getQuestProgress = function(questId) {
            const quest = this.getQuestInternal(questId);
            if (!quest || !quest.objectives.length) {
                return 0;
            }
            const completed = quest.objectives.filter((objective) => objective.completed).length;
            const progress = Math.round((completed / quest.objectives.length) * 100);
            return progress;
        };

        manager.areAllObjectivesCompleted = function(questId) {
            const quest = this.getQuestInternal(questId);
            if (!quest || !quest.objectives.length) {
                return false;
            }
            return quest.objectives.every((objective) => objective.completed);
        };

        manager.isObjectiveCompleted = function(questId, objectiveId) {
            const quest = this.getQuestInternal(questId);
            if (!quest) {
                return false;
            }
            const objective = quest.objectives.find((obj) => obj.id === objectiveId);
            return objective ? objective.completed : false;
        };

        manager.getAllCategories = function() {
            const categories = [
                {
                    id: "main",
                    name: QuestSystemParams.text.categoryMain,
                    description: QuestSystemParams.text.categoryMainDescription,
                    icon: 0,
                    sortOrder: 0,
                    builtin: true
                }
            ];

            if (QuestSystemParams.showCompletedCategory) {
                categories.push({
                    id: SPECIAL_CATEGORY_IDS.COMPLETED,
                    name: QuestSystemParams.text.categoryCompleted,
                    description: QuestSystemParams.text.categoryCompletedDescription,
                    icon: QuestSystemParams.icons.categoryCompleted,
                    sortOrder: 50,
                    builtin: true,
                    statusFilter: STATUS.COMPLETED
                });
            }

            if (QuestSystemParams.showFailedCategory) {
                categories.push({
                    id: SPECIAL_CATEGORY_IDS.FAILED,
                    name: QuestSystemParams.text.categoryFailed,
                    description: QuestSystemParams.text.categoryFailedDescription,
                    icon: QuestSystemParams.icons.categoryFailed,
                    sortOrder: 60,
                    builtin: true,
                    statusFilter: STATUS.FAILED
                });
            }

            this._customCategories.forEach((category) => {
                categories.push({
                    id: category.id,
                    name: category.name,
                    description: category.description || "",
                    icon: category.icon,
                    sortOrder: category.sortOrder,
                    builtin: false
                });
            });

            categories.sort((a, b) => {
                if (a.sortOrder !== b.sortOrder) {
                    return a.sortOrder - b.sortOrder;
                }
                return a.name.localeCompare(b.name);
            });

            return categories.map((category) => ({ ...category }));
        };

        manager.getCategoryInfo = function(categoryId) {
            return this.getAllCategories().find((category) => category.id === categoryId);
        };

        manager.predefinedQuestIds = function() {
            return Array.from(this._predefinedQuestMap.keys());
        };

        manager.playSe = function(soundName) {
            if (!soundName) {
                return;
            }
            if (typeof AudioManager !== "undefined" && AudioManager.playSe) {
                AudioManager.playSe({ name: soundName, volume: 90, pitch: 100, pan: 0 });
            }
        };

        manager.playObjectiveCompleteSe = function() {
            this.playSe(QuestSystemParams.sounds.objectiveComplete);
        };

        manager.playQuestCompleteSe = function() {
            this.playSe(QuestSystemParams.sounds.questComplete);
        };

        manager.playQuestFailedSe = function() {
            this.playSe(QuestSystemParams.sounds.questFailed);
        };

        manager.applyVariableOperation = function(variableId, value, operation) {
            if (!variableId || variableId <= 0) {
                return;
            }
            const currentValue = $gameVariables.value(variableId);
            const numValue = Number(value) || 0;
            
            switch (operation) {
                case "add":
                    $gameVariables.setValue(variableId, currentValue + numValue);
                    break;
                case "sub":
                    $gameVariables.setValue(variableId, currentValue - numValue);
                    break;
                case "set":
                default:
                    $gameVariables.setValue(variableId, numValue);
                    break;
            }
        };

        manager.handleObjectiveCompleted = function(quest, objective) {
            this.playObjectiveCompleteSe();
            QuestNotifications.enqueue({ type: "objective", quest, objective });
            
            // НЕ очищаем localKillCounts здесь - он нужен для проверки отката
            // Очистка произойдёт только при завершении/провале всего квеста
            
            // Выполняем действия при завершении цели
            if (objective.onCompleteSwitch && objective.onCompleteSwitch > 0) {
                $gameSwitches.setValue(objective.onCompleteSwitch, true);
            }
            if (objective.onCompleteVariable && objective.onCompleteVariable > 0) {
                this.applyVariableOperation(
                    objective.onCompleteVariable,
                    objective.onCompleteVariableValue || 1,
                    objective.onCompleteVariableOp || "set"
                );
            }
            if (objective.onCompleteCommonEvent && objective.onCompleteCommonEvent > 0) {
                $gameTemp.reserveCommonEvent(objective.onCompleteCommonEvent);
            }
        };

        manager.handleQuestCompletion = function(quest) {
            this.playQuestCompleteSe();
            QuestNotifications.enqueue({ type: "questComplete", quest });
            
            // Сбрасываем счётчики убийств для этого квеста
            this.resetQuestEnemyBaselines(quest);
            
            // Снимаем отслеживание с завершённого квеста
            if (quest.tracked) {
                quest.tracked = false;
                requestTrackerRefresh();
            }
            
            // Выполняем действия при завершении квеста
            if (quest.onCompleteSwitch && quest.onCompleteSwitch > 0) {
                $gameSwitches.setValue(quest.onCompleteSwitch, true);
            }
            if (quest.onCompleteVariable && quest.onCompleteVariable > 0) {
                this.applyVariableOperation(
                    quest.onCompleteVariable,
                    quest.onCompleteVariableValue || 1,
                    quest.onCompleteVariableOp || "set"
                );
            }
            if (quest.onCompleteCommonEvent && quest.onCompleteCommonEvent > 0) {
                $gameTemp.reserveCommonEvent(quest.onCompleteCommonEvent);
            }
        };

        manager.handleQuestFailed = function(quest) {
            this.playQuestFailedSe();
            QuestNotifications.enqueue({ type: "questFailed", quest });
            
            // Сбрасываем счётчики убийств для этого квеста
            this.resetQuestEnemyBaselines(quest);
            
            // Снимаем отслеживание с проваленного квеста
            if (quest.tracked) {
                quest.tracked = false;
                requestTrackerRefresh();
            }
            
            // Выполняем действия при провале квеста
            if (quest.onFailSwitch && quest.onFailSwitch > 0) {
                $gameSwitches.setValue(quest.onFailSwitch, true);
            }
            if (quest.onFailVariable && quest.onFailVariable > 0) {
                this.applyVariableOperation(
                    quest.onFailVariable,
                    quest.onFailVariableValue || 1,
                    quest.onFailVariableOp || "set"
                );
            }
            if (quest.onFailCommonEvent && quest.onFailCommonEvent > 0) {
                $gameTemp.reserveCommonEvent(quest.onFailCommonEvent);
            }
        };

        manager.openQuestLog = function() {
            this.ensureRuntime();
            if (typeof Scene_QuestLog === "function") {
                SceneManager.push(Scene_QuestLog);
            } else {
                this.reportWarning("Scene_QuestLog ещё не реализована.");
            }
        };

        manager.STATUS = STATUS;

        return manager;
    })();

    window.QuestManager = QuestManager;

    QuestManager.initialize();

    const ensureQuestSystemReady = () => {
        QuestManager.ensureRuntime();
    };

    const sanitizeId = (value) => String(value ?? "").trim();

    const parseObjectivesArgument = (value) => {
        const list = parseStructArray(value || []);
        return list.map(parseObjectiveDataStruct);
    };

    PluginManager.registerCommand(pluginName, "ActivatePredefinedQuest", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("ActivatePredefinedQuest: не указан Quest ID.");
            return;
        }
        QuestManager.activatePredefinedQuest(questId);
    });

    PluginManager.registerCommand(pluginName, "AddQuest", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("AddQuest: не указан Quest ID.");
            return;
        }

        const payload = {
            id: questId,
            title: args.title ?? "",
            categoryId: sanitizeId(args.categoryId) || "main",
            description: args.description ?? "",
            questGiver: args.questGiver ?? "",
            location: args.location ?? "",
            objectives: parseObjectivesArgument(args.objectives),
            reward: args.reward ?? "",
            initialStatus: args.initialStatus ?? STATUS.HIDDEN,
            trackOnCreate: toBoolean(args.trackOnCreate, false)
        };

        QuestManager.addQuest(payload);
    });

    PluginManager.registerCommand(pluginName, "UpdateQuestStatus", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("UpdateQuestStatus: не указан Quest ID.");
            return;
        }
        QuestManager.updateQuestStatus(questId, args.status ?? STATUS.ACTIVE);
    });

    PluginManager.registerCommand(pluginName, "CompleteObjective", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const objectiveId = sanitizeId(args.objectiveId);
        if (!questId || !objectiveId) {
            QuestManager.reportWarning("CompleteObjective: требуется Quest ID и Objective ID.");
            return;
        }
        QuestManager.completeObjective(questId, objectiveId);
    });

    PluginManager.registerCommand(pluginName, "AddObjective", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const objectiveId = sanitizeId(args.objectiveId);
        if (!questId || !objectiveId) {
            QuestManager.reportWarning("AddObjective: требуется Quest ID и Objective ID.");
            return;
        }
        const objectiveData = {
            id: objectiveId,
            text: args.objectiveText ?? ""
        };
        QuestManager.addObjective(questId, objectiveData);
    });

    PluginManager.registerCommand(pluginName, "RemoveQuest", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("RemoveQuest: не указан Quest ID.");
            return;
        }
        QuestManager.removeQuest(questId);
    });

    PluginManager.registerCommand(pluginName, "UpdateQuestField", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const field = sanitizeId(args.field);
        if (!questId || !field) {
            QuestManager.reportWarning("UpdateQuestField: требуется Quest ID и Field.");
            return;
        }
        QuestManager.updateQuestField(questId, field, args.value ?? "");
    });

    PluginManager.registerCommand(pluginName, "OpenQuestLog", () => {
        ensureQuestSystemReady();
        QuestManager.openQuestLog();
    });

    PluginManager.registerCommand(pluginName, "TrackQuest", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("TrackQuest: не указан Quest ID.");
            return;
        }
        QuestManager.trackQuest(questId);
    });

    PluginManager.registerCommand(pluginName, "UntrackQuest", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("UntrackQuest: не указан Quest ID.");
            return;
        }
        QuestManager.untrackQuest(questId);
    });

    PluginManager.registerCommand(pluginName, "ToggleQuestTracking", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        if (!questId) {
            QuestManager.reportWarning("ToggleQuestTracking: не указан Quest ID.");
            return;
        }
        QuestManager.toggleQuestTracking(questId);
    });

    PluginManager.registerCommand(pluginName, "SetObjectiveHidden", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const objectiveId = sanitizeId(args.objectiveId);
        if (!questId || !objectiveId) {
            QuestManager.reportWarning("SetObjectiveHidden: требуется Quest ID и Objective ID.");
            return;
        }
        QuestManager.setObjectiveHidden(questId, objectiveId, toBoolean(args.hidden, false));
    });

    PluginManager.registerCommand(pluginName, "SetObjectiveCompleted", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const objectiveId = sanitizeId(args.objectiveId);
        if (!questId || !objectiveId) {
            QuestManager.reportWarning("SetObjectiveCompleted: требуется Quest ID и Objective ID.");
            return;
        }
        const completed = toBoolean(args.completed, true);
        QuestManager.setObjectiveCompleted(questId, objectiveId, completed);
    });

    PluginManager.registerCommand(pluginName, "SetObjectiveAutoTracking", (args) => {
        ensureQuestSystemReady();
        const questId = sanitizeId(args.questId);
        const objectiveId = sanitizeId(args.objectiveId);
        if (!questId || !objectiveId) {
            QuestManager.reportWarning("SetObjectiveAutoTracking: требуется Quest ID и Objective ID.");
            return;
        }
        const autoTracking = toBoolean(args.autoTracking, true);
        QuestManager.setObjectiveAutoTracking(questId, objectiveId, autoTracking);
    });

    // ============================================================================
    // Глобальные функции для использования в скриптах и условиях
    // ============================================================================
    
    /**
     * Вспомогательная функция для создания ключа трекинга
     * @private
     */
    const _makeTrackingKey = (type, id) => `${String(type || "").toUpperCase()}:${Number(id)}`;
    
    /**
     * Проверяет прогресс отслеживания для конкретной цели квеста.
     * Используйте в условных ветвлениях: Script: $checkObjectiveProgress('questId', 'objectiveId', 0)
     * @param {string} questId - ID квеста
     * @param {string} objectiveId - ID цели
     * @param {number} targetIndex - Индекс цели трекинга (0 для первой, 1 для второй и т.д.)
     * @returns {object} Объект с полями: current, amount, met (boolean)
     */
    window.$checkObjectiveProgress = function(questId, objectiveId, targetIndex = 0) {
        if (!QuestManager || !QuestManager.isReady()) {
            return { current: 0, amount: 0, met: false };
        }
        
        const quest = QuestManager.getQuestInternal(questId);
        if (!quest) {
            return { current: 0, amount: 0, met: false };
        }
        
        const objective = quest.objectives?.find(obj => obj.id === objectiveId);
        if (!objective || !objective.autoTracking) {
            return { current: 0, amount: 0, met: false };
        }
        
        const targets = objective.trackingTargets || [];
        if (targetIndex < 0 || targetIndex >= targets.length) {
            return { current: 0, amount: 0, met: false };
        }
        
        const target = targets[targetIndex];
        const info = QuestManager.resolveTrackingToken(target.type, target.id, target.amount, objective);
        const currentRaw = info ? (info.currentRaw ?? info.current ?? 0) : 0;
        const baseline = objective.trackingBaselines?.[_makeTrackingKey(target.type, target.id)] ?? 0;
        const progress = Math.max(0, currentRaw - baseline);
        
        return {
            current: progress,
            amount: target.amount,
            met: progress >= target.amount
        };
    };
    
    /**
     * Проверяет сколько врагов определённого типа убито для цели квеста.
     * Используйте в условных ветвлениях: Script: $checkEnemyKills('questId', 'objectiveId', 1) >= 5
     * @param {string} questId - ID квеста
     * @param {string} objectiveId - ID цели
     * @param {number} enemyId - ID врага в базе данных
     * @returns {number} Количество убитых врагов для этой цели
     */
    window.$checkEnemyKills = function(questId, objectiveId, enemyId) {
        const quest = QuestManager?.getQuestInternal?.(questId);
        if (!quest) return 0;
        
        const objective = quest.objectives?.find(obj => obj.id === objectiveId);
        if (!objective || !objective.autoTracking) return 0;
        
        const target = (objective.trackingTargets || []).find(t => 
            t.type === 'E' && t.id === enemyId
        );
        if (!target) return 0;
        
        const info = QuestManager.resolveTrackingToken('E', enemyId, target.amount, objective);
        const currentRaw = info ? (info.currentRaw ?? info.current ?? 0) : 0;
        const baseline = objective.trackingBaselines?.[_makeTrackingKey('E', enemyId)] ?? 0;
        
        return Math.max(0, currentRaw - baseline);
    };
    
    /**
     * Проверяет сколько предметов определённого типа собрано для цели квеста.
     * Используйте в условных ветвлениях: Script: $checkItemCount('questId', 'objectiveId', 1) >= 3
     * @param {string} questId - ID квеста
     * @param {string} objectiveId - ID цели
     * @param {number} itemId - ID предмета в базе данных
     * @param {string} itemType - Тип предмета: 'IT' (предмет), 'W' (оружие), 'A' (броня)
     * @returns {number} Количество предметов для этой цели
     */
    window.$checkItemCount = function(questId, objectiveId, itemId, itemType = 'IT') {
        const quest = QuestManager?.getQuestInternal?.(questId);
        if (!quest) return 0;
        
        const objective = quest.objectives?.find(obj => obj.id === objectiveId);
        if (!objective || !objective.autoTracking) return 0;
        
        const normalizedType = String(itemType).toUpperCase();
        const target = (objective.trackingTargets || []).find(t => 
            t.type === normalizedType && t.id === itemId
        );
        if (!target) return 0;
        
        const info = QuestManager.resolveTrackingToken(normalizedType, itemId, target.amount, objective);
        const currentRaw = info ? (info.currentRaw ?? info.current ?? 0) : 0;
        const baseline = objective.trackingBaselines?.[_makeTrackingKey(normalizedType, itemId)] ?? 0;
        
        return Math.max(0, currentRaw - baseline);
    };
    
    /**
     * Проверяет выполнена ли конкретная цель квеста.
     * Используйте в условных ветвлениях: Script: $isObjectiveCompleted('questId', 'objectiveId')
     * @param {string} questId - ID квеста
     * @param {string} objectiveId - ID цели
     * @returns {boolean} true если цель выполнена
     */
    window.$isObjectiveCompleted = function(questId, objectiveId) {
        const quest = QuestManager?.getQuestInternal?.(questId);
        if (!quest) return false;
        
        const objective = quest.objectives?.find(obj => obj.id === objectiveId);
        return objective ? !!objective.completed : false;
    };
    
    /**
     * Проверяет статус квеста.
     * Используйте в условных ветвлениях: Script: $getQuestStatus('questId') === 'completed'
     * @param {string} questId - ID квеста
     * @returns {string} Статус квеста: 'available', 'active', 'completed', 'failed', 'hidden' или null
     */
    window.$getQuestStatus = function(questId) {
        const quest = QuestManager?.getQuestInternal?.(questId);
        return quest ? quest.status : null;
    };

    class Window_QuestCategory extends Window_Command {
        initialize(rect) {
            this._categories = [];
            this._changeHandler = null;
            super.initialize(rect);
            this.opacity = QuestSystemParams.questLogWindow.windowOpacity;
            this.backOpacity = QuestSystemParams.questLogWindow.backgroundOpacity;
            this.refresh();
            if (this.maxItems() > 0) {
                this.select(0);
            }
        }

        maxCols() {
            if (QuestSystemParams.layout === "horizontal") {
                return Math.max(1, Math.min(this._categories.length || 1, 4));
            }
            return 1;
        }

        itemHeight() {
            return this.lineHeight() + 8;
        }

        makeCommandList() {
            QuestManager.ensureRuntime();
            this._categories = QuestManager.getAllCategories();
            this._categories.forEach((category) => {
                this.addCommand(category.name, "category", true, category.id);
            });
        }

        drawItem(index) {
            const rect = this.itemRectWithPadding(index);
            const category = this._categories[index];
            if (!category) {
                return;
            }
            this.resetTextColor();
            let x = rect.x;
            if (category.icon) {
                const iconY = rect.y + Math.floor((rect.height - ImageManager.iconHeight) / 2);
                this.drawIcon(category.icon, x, iconY);
                x += ImageManager.iconWidth + 6;
            }
            const counterText = this.buildCounterText(category);
            const reservedWidth = counterText ? this.textWidth(counterText) + 12 : 0;
            const textWidth = Math.max(0, rect.width - (x - rect.x) - reservedWidth);
            this.drawTextEx(category.name, x, rect.y, textWidth);
            if (counterText) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(counterText, rect.x, rect.y, rect.width - this.padding * 2, "right");
                this.resetTextColor();
            }
        }

        buildCounterText(category) {
            if (!QuestSystemParams.showQuestCounter) {
                return "";
            }
            const mode = QuestSystemParams.categoryCounterMode;
            if (mode === CATEGORY_COUNTER_MODES.NONE) {
                return "";
            }
            QuestManager.ensureRuntime();
            const quests = QuestManager.getQuestsByCategory(category.id, {
                includeHidden: false,
                includeCompleted: true,
                includeFailed: true
            });

            const activeCount = quests.filter((quest) => quest.status === STATUS.ACTIVE).length;
            const availableCount = quests.filter((quest) => quest.status === STATUS.AVAILABLE).length;

            if (category.statusFilter === STATUS.COMPLETED) {
                const completedCount = quests.length;
                if (mode === CATEGORY_COUNTER_MODES.ACTIVE_ONLY) {
                    return `${completedCount}`;
                }
                if (mode === CATEGORY_COUNTER_MODES.ACTIVE_AVAILABLE) {
                    return `${completedCount}`;
                }
                return "";
            }

            if (category.statusFilter === STATUS.FAILED) {
                const failedCount = quests.length;
                if (mode === CATEGORY_COUNTER_MODES.ACTIVE_ONLY) {
                    return `${failedCount}`;
                }
                if (mode === CATEGORY_COUNTER_MODES.ACTIVE_AVAILABLE) {
                    return `${failedCount}`;
                }
                return "";
            }

            if (mode === CATEGORY_COUNTER_MODES.ACTIVE_ONLY) {
                return `${activeCount}`;
            }

            return `${activeCount}/${availableCount}`;
        }

        setChangeHandler(handler) {
            this._changeHandler = handler;
        }

        cursorMove(scroll) {
            const previousIndex = this.index();
            super.cursorMove(scroll);
            if (this._changeHandler && this.index() !== previousIndex) {
                this._changeHandler();
            }
        }

        processCursorMove() {
            const previousIndex = this.index();
            super.processCursorMove();
            if (this._changeHandler && this.index() !== previousIndex) {
                this._changeHandler();
            }
        }

        onTouchSelect(trigger) {
            const previousIndex = this.index();
            super.onTouchSelect(trigger);
            if (this._changeHandler && this.index() !== previousIndex) {
                this._changeHandler();
            }
        }

        currentCategoryId() {
            return this.currentExt();
        }

        refresh() {
            const previousId = this.currentCategoryId();
            const handler = this._changeHandler;
            this._changeHandler = null;
            super.refresh();
            const index = this._categories.findIndex((category) => category.id === previousId);
            if (this.maxItems() > 0) {
                this.select(index >= 0 ? index : 0);
            } else {
                this.deselect();
            }
            this._changeHandler = handler;
            if (this._changeHandler) {
                this._changeHandler();
            }
        }
    }

    class Window_QuestList extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this.opacity = QuestSystemParams.questLogWindow.windowOpacity;
            this.backOpacity = QuestSystemParams.questLogWindow.backgroundOpacity;
            this._categoryId = null;
            this._quests = [];
            this._selectHandler = null;
            this._resetScrollOnRefresh = false;
            this.refresh();
        }

        maxItems() {
            return this._quests.length;
        }

        itemHeight() {
            return this.lineHeight() + 8;
        }

        setCategory(categoryId, silent = false) {
            if (Utils.isOptionValid("test")) {
                console.log(`[QuestSystem] Window_QuestList.setCategory called with categoryId='${categoryId}', current='${this._categoryId}', silent=${silent}`);
            }
            
            // Временно отключаем обработчик при silent режиме
            const savedHandler = this._selectHandler;
            if (silent) {
                this._selectHandler = null;
            }
            
            if (this._categoryId !== categoryId) {
                this._categoryId = categoryId;
                this._resetScrollOnRefresh = true;
                this.refresh();
                if (Utils.isOptionValid("test")) {
                    console.log(`[QuestSystem] Window_QuestList.setCategory: refreshed, now have ${this._quests.length} quests`);
                }
            } else {
                if (Utils.isOptionValid("test")) {
                    console.log(`[QuestSystem] Window_QuestList.setCategory: category unchanged, skipping refresh`);
                }
            }
            if (this.maxItems() > 0 && this.index() < 0) {
                this.select(0);
            } else if (this.index() >= this.maxItems()) {
                this.select(this.maxItems() - 1);
            } else if (this.maxItems() === 0) {
                this.deselect();
            }
            
            // Восстанавливаем обработчик
            if (silent) {
                this._selectHandler = savedHandler;
            } else if (this._selectHandler) {
                this._selectHandler(this.currentQuest());
            }
        }

        makeItemList() {
            QuestManager.ensureRuntime();
            if (this._categoryId) {
                this._quests = QuestManager.getQuestsByCategory(this._categoryId, {
                    includeHidden: false,
                    includeCompleted: QuestSystemParams.showCompleted,
                    includeFailed: QuestSystemParams.showFailed
                });
                if (Utils.isOptionValid("test")) {
                    console.log(`[QuestSystem] Window_QuestList.makeItemList: categoryId='${this._categoryId}', found ${this._quests.length} quests`);
                    this._quests.forEach((quest) => {
                        console.log(`  - Quest ID: ${quest.id}, Status: ${quest.status}, Category: ${quest.categoryId}`);
                    });
                }
            } else {
                this._quests = [];
            }
        }

        refresh() {
            const previousId = this.currentQuestId();
            const previousTopRow = this._resetScrollOnRefresh ? 0 : this.topRow();
            if (Utils.isOptionValid("test")) {
                console.log(`[QuestSystem] Window_QuestList.refresh called, categoryId='${this._categoryId}', previousQuestId='${previousId}'`);
            }
            this.makeItemList();
            super.refresh();
            this.setTopRow(previousTopRow);
            if (this._quests.length > 0) {
                const index = this.findQuestIndex(previousId);
                const handler = this._selectHandler;
                this._selectHandler = null;
                this.select(index >= 0 ? index : 0);
                this._selectHandler = handler;
            } else {
                this.deselect();
            }
            this.ensureCursorVisible();
            if (this._selectHandler) {
                this._selectHandler(this.currentQuest());
            }
            this._resetScrollOnRefresh = false;
            if (Utils.isOptionValid("test")) {
                console.log(`[QuestSystem] Window_QuestList.refresh complete, ${this._quests.length} quests, maxItems=${this.maxItems()}, index=${this.index()}`);
            }
        }

        findQuestIndex(questId) {
            return this._quests.findIndex((quest) => quest.id === questId);
        }

        currentQuestId() {
            const quest = this.currentQuest();
            return quest ? quest.id : null;
        }

        currentQuest() {
            return this.index() >= 0 ? this._quests[this.index()] : null;
        }

        setSelectHandler(handler) {
            this._selectHandler = handler;
        }

        processHandling() {
            super.processHandling();
            if (!this.isOpenAndActive()) {
                return;
            }
            if (Input.isTriggered("shift")) {
                this.toggleTracking();
            }
        }

        toggleTracking() {
            const quest = this.currentQuest();
            if (!quest) {
                SoundManager.playBuzzer();
                return;
            }
            
            // Проверяем, активен ли квест
            if (quest.status !== STATUS.ACTIVE) {
                SoundManager.playBuzzer();
                return;
            }
            
            QuestManager.ensureRuntime();
            const result = QuestManager.toggleQuestTracking(quest.id);
            if (result !== null) {
                SoundManager.playOk();
                const index = this.index();
                this.refresh();
                this.select(Math.min(index, this.maxItems() - 1));
                if (this._selectHandler) {
                    this._selectHandler(this.currentQuest());
                }
            } else {
                SoundManager.playBuzzer();
            }
        }

        select(index) {
            const previous = this.index();
            super.select(index);
            if (this._selectHandler && this.index() !== previous) {
                this._selectHandler(this.currentQuest());
            }
        }

        drawItem(index) {
            const quest = this._quests[index];
            if (!quest) {
                return;
            }
            const rect = this.itemRectWithPadding(index);
            let x = rect.x;
            const iconIndex = statusIconIndex(quest.status);
            if (iconIndex > 0) {
                const iconY = rect.y + Math.floor((rect.height - ImageManager.iconHeight) / 2);
                this.drawIcon(iconIndex, x, iconY);
                x += ImageManager.iconWidth + 6;
            }
            if (quest.tracked && QuestSystemParams.icons.tracked > 0) {
                const iconY = rect.y + Math.floor((rect.height - ImageManager.iconHeight) / 2);
                this.drawIcon(QuestSystemParams.icons.tracked, x, iconY);
                x += ImageManager.iconWidth + 6;
            }
            const title = questDisplayTitle(quest);
            const safeTitle = title.replace(/\n/g, " ");
            const textWidth = rect.width - (x - rect.x);
            const needsColorWrap = !/\\C\[\d+\]/i.test(safeTitle);
            const colorIndex = STATUS_COLOR_INDEX[quest.status] ?? 0;
            const displayTitle = needsColorWrap ? `\\C[${colorIndex}]${safeTitle}\\C[0]` : safeTitle;
            this.drawTextEx(displayTitle, x, rect.y, Math.max(textWidth, 0));
            this.resetTextColor();
        }
    }

    class Window_QuestDetails extends Window_Scrollable {
        initialize(rect) {
            super.initialize(rect);
            this.opacity = QuestSystemParams.questLogWindow.windowOpacity;
            this.backOpacity = QuestSystemParams.questLogWindow.backgroundOpacity;
            this._quest = null;
            this._category = null;
            this._contentHeight = 0;
            this.setScrollAccel(0, this.lineHeight());
        }

        setQuest(quest) {
            const newQuest = quest ? deepClone(quest) : null;
            const currentId = this._quest ? this._quest.id : null;
            const newId = newQuest ? newQuest.id : null;
            const currentUpdated = this._quest ? this._quest.updatedAt : null;
            const newUpdated = newQuest ? newQuest.updatedAt : null;
            if (currentId !== newId || currentUpdated !== newUpdated) {
                this._quest = newQuest;
                this._category = null;
                this.scrollTo(0, 0);
                this.refresh();
            }
        }

        setCategory(category) {
            const newCategory = category ? deepClone(category) : null;
            const currentId = this._category ? this._category.id : null;
            const newId = newCategory ? newCategory.id : null;
            if (currentId !== newId) {
                this._category = newCategory;
                this._quest = null;
                this.scrollTo(0, 0);
                this.refresh();
            }
        }

        resolvedDescription() {
            if (!this._quest) {
                return "";
            }
            const description = questDescriptionForStatus(this._quest);
            return description || "";
        }

        drawHorzLine(y) {
            const lineY = y + this.lineHeight() / 2 - 1;
            this.contents.paintOpacity = 48;
            this.contents.fillRect(0, lineY, this.contentsWidth(), 2, ColorManager.normalColor());
            this.contents.paintOpacity = 255;
        }

        ensureContentsHeight(height) {
            const width = this.contentsWidth();
            const targetHeight = Math.max(this.innerHeight, Math.ceil(height || 0));
            if (!this.contents) {
                this.createContents();
            }
            if (this.contents.height !== targetHeight) {
                this.contents.resize(width, targetHeight);
                if (this.contentsBack) {
                    this.contentsBack.resize(width, targetHeight);
                }
            }
        }

        refresh() {
            if (!this.contents) {
                this.createContents();
            }
            this.ensureContentsHeight(this.innerHeight);
            this.contents.clear();
            if (this.contentsBack) {
                this.contentsBack.clear();
            }

            let contentHeight = this.renderContent();

            if (contentHeight > this.contents.height) {
                this.ensureContentsHeight(contentHeight);
                this.contents.clear();
                if (this.contentsBack) {
                    this.contentsBack.clear();
                }
                contentHeight = this.renderContent();
            }

            this._contentHeight = contentHeight;
            this.scrollTo(this.scrollX(), Math.min(this.scrollY(), this.maxScrollY()));
        }

        renderContent() {
            let y = 0;

            if (this._category) {
                return this.drawCategoryInfo(y);
            }

            if (!this._quest) {
                const message = "Выберите квест";
                this.drawText(message, 0, 0, this.contentsWidth(), "center");
                return this.lineHeight();
            }

            y = this.drawTitleSection(y);
            y = this.drawInfoSection(y);
            y = this.drawDescriptionSection(y);
            y = this.drawObjectivesSection(y);
            y = this.drawRewardSection(y);

            return y;
        }

        drawCategoryInfo(y) {
            if (!this._category) {
                return y;
            }
            
            let x = 0;
            if (this._category.icon) {
                this.drawIcon(this._category.icon, x, y + 2);
                x += ImageManager.iconWidth + 6;
            }
            
            this.changeTextColor(ColorManager.systemColor());
            const categoryName = QuestManager.renderDecoratedText(this._category.name, { hideDefaultCounts: true });
            this.drawTextEx(categoryName, x, y, this.contentsWidth() - x);
            this.resetTextColor();
            y += this.lineHeight() + 6;
            
            if (this._category.description) {
                const categoryDescription = QuestManager.renderDecoratedText(this._category.description, { hideDefaultCounts: true });
                y = this.drawWrappedText(categoryDescription, 0, y, this.contentsWidth());
                y += 12;
            }
            
            QuestManager.ensureRuntime();
            const quests = QuestManager.getQuestsByCategory(this._category.id, {
                includeHidden: false,
                includeCompleted: QuestSystemParams.showCompleted,
                includeFailed: QuestSystemParams.showFailed
            });
            
            const activeCount = quests.filter((q) => q.status === STATUS.ACTIVE).length;
            const completedCount = quests.filter((q) => q.status === STATUS.COMPLETED).length;
            const availableCount = quests.filter((q) => q.status === STATUS.AVAILABLE).length;
            const failedCount = quests.filter((q) => q.status === STATUS.FAILED).length;
            
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Статистика:", 0, y, this.contentsWidth());
            this.resetTextColor();
            y += this.lineHeight();
            
            if (activeCount > 0) {
                const colorIndex = STATUS_COLOR_INDEX[STATUS.ACTIVE];
                this.drawTextEx(`\\C[${colorIndex}]Активных:\\C[0] ${activeCount}`, 0, y, this.contentsWidth());
                y += this.lineHeight();
            }
            
            if (availableCount > 0) {
                this.drawText(`Доступных: ${availableCount}`, 0, y, this.contentsWidth());
                y += this.lineHeight();
            }
            
            if (completedCount > 0) {
                const colorIndex = STATUS_COLOR_INDEX[STATUS.COMPLETED];
                this.drawTextEx(`\\C[${colorIndex}]Завершено:\\C[0] ${completedCount}`, 0, y, this.contentsWidth());
                y += this.lineHeight();
            }

            if (failedCount > 0) {
                const colorIndex = STATUS_COLOR_INDEX[STATUS.FAILED];
                this.drawTextEx(`\\C[${colorIndex}]Провалено:\\C[0] ${failedCount}`, 0, y, this.contentsWidth());
                y += this.lineHeight();
            }
            
            return y;
        }

        maxScrollY() {
            return Math.max(0, this._contentHeight - this.innerHeight);
        }

        scrollBlockHeight() {
            return Math.max(this.lineHeight(), 24);
        }

        isScrollEnabled() {
            return this.visible && this.isOpen() && this._contentHeight > this.innerHeight;
        }

        update() {
            super.update();
            this.processPassiveWheel();
        }

        updateOrigin() {
            this._scrollBaseX = 0;
            this._scrollBaseY = 0;
            this.origin.x = this._scrollX;
            this.origin.y = this._scrollY;
        }

        processPassiveWheel() {
            if (!this.isScrollEnabled()) {
                return;
            }
            const wheelDelta = TouchInput.wheelY || 0;
            if (wheelDelta === 0) {
                return;
            }
            if (!this.isPointerInside(TouchInput.x, TouchInput.y)) {
                return;
            }
            const direction = wheelDelta > 0 ? 1 : -1;
            const steps = Math.max(1, Math.ceil(Math.abs(wheelDelta) / 120));
            const amount = direction * steps * this.scrollBlockHeight();
            this.smoothScrollBy(0, amount);
        }

        isPointerInside(screenX, screenY) {
            const localX = screenX - this.x;
            const localY = screenY - this.y;
            return localX >= 0 && localY >= 0 && localX < this.width && localY < this.height;
        }

        drawTitleSection(y) {
            let x = 0;
            const iconIndex = statusIconIndex(this._quest.status);
            if (iconIndex > 0) {
                this.drawIcon(iconIndex, x, y + 2);
                x += ImageManager.iconWidth + 6;
            }
            const title = questDisplayTitle(this._quest);
            const safeTitle = title.replace(/\n/g, " ");
            const needsColorWrap = !/\\C\[\d+\]/i.test(safeTitle);
            const colorIndex = STATUS_COLOR_INDEX[this._quest.status] ?? 0;
            const displayTitle = needsColorWrap ? `\\C[${colorIndex}]${safeTitle}\\C[0]` : safeTitle;
            this.drawTextEx(displayTitle, x, y, this.contentsWidth() - x - 120);

            const baseStatusLabel = STATUS_LABELS[this._quest.status] || "";
            const trackingLabel = this._quest.tracked ? (baseStatusLabel ? `${baseStatusLabel} • Отслеживается` : "Отслеживается") : baseStatusLabel;
            if (trackingLabel) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(trackingLabel, 0, y, this.contentsWidth(), "right");
                this.resetTextColor();
            }

            y += this.lineHeight();
            return y + 6;
        }

        drawInfoSection(y) {
            const labelWidth = 140;
            y = this.drawInfoLine(QuestSystemParams.text.questGiver, this._quest.questGiver, labelWidth, y);
            y = this.drawInfoLine(QuestSystemParams.text.location, this._quest.location, labelWidth, y);
            return y;
        }

        drawInfoLine(label, value, labelWidth, y) {
            if (!value) {
                return y;
            }
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(label, 0, y, labelWidth);
            this.resetTextColor();
            const renderedValue = QuestManager.renderDecoratedText(value, { hideDefaultCounts: true });
            this.drawTextEx(renderedValue, labelWidth, y, this.contentsWidth() - labelWidth);
            return y + this.lineHeight();
        }

        drawDescriptionSection(y) {
            const description = this.resolvedDescription();
            if (!description) {
                return y;
            }
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Описание:", 0, y, this.contentsWidth());
            this.resetTextColor();
            y += this.lineHeight();
            y = this.drawWrappedText(description, 0, y, this.contentsWidth());
            return y + 6;
        }

        drawObjectivesSection(y) {
            if (this._quest.status === STATUS.AVAILABLE) {
                return y;
            }
            const objectives = this._quest.objectives || [];
            const visibleObjectives = objectives.filter((objective) => objective && !objective.hidden);
            if (!visibleObjectives.length) {
                return y;
            }
            const progressText = objectives.length ? `${QuestManager.getQuestProgress(this._quest.id)}%` : "";
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(QuestSystemParams.text.objectives, 0, y, this.contentsWidth());
            if (progressText) {
                this.drawText(progressText, 0, y, this.contentsWidth(), "right");
            }
            this.resetTextColor();
            y += this.lineHeight();

            const bulletWidth = 28;
            const textWidth = this.contentsWidth() - bulletWidth;
            visibleObjectives.forEach((objective) => {
                this.changeTextColor(objective.completed ? statusTextColor(STATUS.COMPLETED) : ColorManager.normalColor());
                const bullet = objective.completed ? "\u2713" : "\u25CB";
                this.drawText(bullet, 0, y, bulletWidth);
                this.resetTextColor();
                const objectiveText = QuestManager.renderObjectiveText(this._quest, objective) || objective.text || objective.id;
                y = this.drawWrappedText(objectiveText, bulletWidth, y, textWidth);
            });
            return y + 6;
        }

        drawRewardSection(y) {
            if (this._quest.status === STATUS.AVAILABLE) {
                return y;
            }
            const reward = this._quest.reward;
            if (!reward) {
                return y;
            }
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(QuestSystemParams.text.reward, 0, y, this.contentsWidth());
            this.resetTextColor();
            y += this.lineHeight();
            const renderedReward = QuestManager.renderDecoratedText(reward, { hideDefaultCounts: true });
            y = this.drawWrappedText(renderedReward, 0, y, this.contentsWidth());
            return y;
        }

        drawWrappedText(text, x, y, width) {
            const lines = this.wrapText(String(text || ""), width);
            for (const line of lines) {
                this.drawTextEx(line, x, y, width);
                y += this.lineHeight();
            }
            return y;
        }

        wrapText(text, width) {
            if (!text) {
                return [];
            }
            const sanitized = text.replace(/\r/g, "");
            const segments = sanitized.split("\n");
            const result = [];
            segments.forEach((segment, segmentIndex) => {
                const parts = segment.split(/(\s+)/);
                let line = "";
                parts.forEach((part) => {
                    if (part.length === 0) {
                        return;
                    }
                    const token = /\s+/.test(part) ? " " : part;
                    const candidate = line + token;
                    const candidateWidth = this.textSizeEx(candidate).width;
                    if (candidateWidth > width && line.length > 0) {
                        result.push(line.trimEnd());
                        line = token.trimStart();
                    } else {
                        line = candidate;
                    }
                });
                result.push(line.trimEnd());
                if (segmentIndex < segments.length - 1) {
                    result.push("");
                }
            });
            return result.filter((line, index, array) => !(line === "" && index === array.length - 1));
        }
    }

    class Scene_QuestLog extends Scene_MenuBase {
        initialize() {
            super.initialize();
        }

        createBackground() {
            Scene_MenuBase.prototype.createBackground.call(this);
            this._questLogBackgroundMode = QuestSystemParams.questLogBackground.scaleMode;
            this._questLogBackgroundLastWidth = 0;
            this._questLogBackgroundLastHeight = 0;
            if (this._backgroundSprite && this._backgroundSprite.anchor) {
                this._backgroundSprite.anchor.set(0.5, 0.5);
            }
            const imageName = QuestSystemParams.questLogBackground.image;
            if (imageName) {
                const bitmap = ImageManager.loadPicture(imageName);
                this._backgroundSprite.bitmap = bitmap;
                if (bitmap && bitmap.addLoadListener) {
                    bitmap.addLoadListener(() => this.refreshQuestLogBackground());
                }
            }
            this.refreshQuestLogBackground();
        }

        refreshQuestLogBackground() {
            if (!this._backgroundSprite || !this._backgroundSprite.bitmap) {
                return;
            }
            const targetWidth = Math.max(1, Graphics.boxWidth);
            const targetHeight = Math.max(1, Graphics.boxHeight);
            applyResponsiveSpriteLayout(
                this._backgroundSprite,
                targetWidth,
                targetHeight,
                this._questLogBackgroundMode
            );
            this._questLogBackgroundLastWidth = targetWidth;
            this._questLogBackgroundLastHeight = targetHeight;
        }

        update() {
            Scene_MenuBase.prototype.update.call(this);
            this.updateQuestLogBackground();
        }

        updateQuestLogBackground() {
            if (!this._backgroundSprite) {
                return;
            }
            if (
                this._questLogBackgroundLastWidth !== Graphics.boxWidth ||
                this._questLogBackgroundLastHeight !== Graphics.boxHeight
            ) {
                this.refreshQuestLogBackground();
            }
        }

        create() {
            super.create();
            QuestManager.ensureRuntime();
            this.createCategoryWindow();
            this.createQuestListWindow();
            this.createDetailsWindow();
            this._categoryWindow.activate();
            this.onCategoryChange();
        }

        helpAreaHeight() {
            return 0;
        }

        createCategoryWindow() {
            const rect = this.categoryWindowRect();
            this._categoryWindow = new Window_QuestCategory(rect);
            this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
            this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
            this._categoryWindow.setChangeHandler(this.onCategoryChange.bind(this));
            this.addWindow(this._categoryWindow);
        }

        createQuestListWindow() {
            const rect = this.questListWindowRect();
            this._questListWindow = new Window_QuestList(rect);
            this._questListWindow.setHandler("ok", this.onQuestOk.bind(this));
            this._questListWindow.setHandler("cancel", this.onQuestCancel.bind(this));
            this._questListWindow.setSelectHandler(this.onQuestChange.bind(this));
            this.addWindow(this._questListWindow);
        }

        createDetailsWindow() {
            const rect = this.questDetailsWindowRect();
            this._questDetailsWindow = new Window_QuestDetails(rect);
            this.addWindow(this._questDetailsWindow);
        }

        categoryCount() {
            return QuestManager.getAllCategories().length;
        }

        categoryWindowLineCount() {
            return Math.max(1, Math.min(this.categoryCount(), 6));
        }

        categoryWindowRect() {
            const top = this.mainAreaTop();
            const height = this.mainAreaHeight();
            if (QuestSystemParams.layout === "horizontal") {
                const cw = Graphics.boxWidth;
                const ch = this.calcWindowHeight(1, true) + 12;
                return new Rectangle(0, top, cw, Math.min(ch, height));
            }
            const cw = Math.max(240, Math.floor(Graphics.boxWidth * 0.3));
            const ch = Math.min(height, this.calcWindowHeight(this.categoryWindowLineCount(), true) + 12);
            return new Rectangle(0, top, cw, ch);
        }

        questListWindowRect() {
            const top = this.mainAreaTop();
            const height = this.mainAreaHeight();
            if (QuestSystemParams.layout === "horizontal") {
                const categoryHeight = this.categoryWindowRect().height;
                const qw = Math.max(320, Math.floor(Graphics.boxWidth * 0.4));
                const qh = Math.max(0, height - categoryHeight);
                return new Rectangle(0, top + categoryHeight, qw, qh);
            }
            const categoryRect = this.categoryWindowRect();
            const qw = categoryRect.width;
            const qh = Math.max(0, height - categoryRect.height);
            return new Rectangle(0, top + categoryRect.height, qw, qh);
        }

        questDetailsWindowRect() {
            const top = this.mainAreaTop();
            const height = this.mainAreaHeight();
            if (QuestSystemParams.layout === "horizontal") {
                const categoryHeight = this.categoryWindowRect().height;
                const listRect = this.questListWindowRect();
                const dx = listRect.width;
                const dw = Math.max(240, Graphics.boxWidth - dx);
                const dh = Math.max(0, height - categoryHeight);
                return new Rectangle(dx, top + categoryHeight, dw, dh);
            }
            const listRect = this.questListWindowRect();
            const dx = listRect.width;
            const dw = Math.max(240, Graphics.boxWidth - dx);
            return new Rectangle(dx, top, dw, height);
        }

        onCategoryChange() {
            const categoryId = this._categoryWindow.currentCategoryId();
            const category = QuestManager.getCategoryInfo(categoryId);
            
            // Сначала показываем описание категории
            this._questDetailsWindow.setCategory(category);
            
            // Затем обновляем список квестов БЕЗ автоматического показа первого квеста
            this._questListWindow.setCategory(categoryId, true);
        }

        onCategoryOk() {
            this._categoryWindow.deactivate();
            if (this._questListWindow.maxItems() > 0) {
                this._questListWindow.select(0);
                // При нажатии на категорию с квестами - показываем первый квест
                const firstQuest = this._questListWindow.currentQuest();
                this._questDetailsWindow.setQuest(firstQuest);
            }
            this._questListWindow.activate();
        }

        onQuestOk() {
            this._questListWindow.activate();
        }

        onQuestCancel() {
            this._questListWindow.deselect();
            this._questListWindow.deactivate();
            this._categoryWindow.activate();
        }

        onQuestChange(quest) {
            const currentQuest = quest || this._questListWindow.currentQuest();
            this._questDetailsWindow.setQuest(currentQuest);
        }
    }

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        if (QuestSystemParams.showInMenu) {
            this.addCommand(QuestSystemParams.menuCommandName, QuestSystemParams.menuCommandSymbol);
        }
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        if (QuestSystemParams.showInMenu) {
            this._commandWindow.setHandler(QuestSystemParams.menuCommandSymbol, this.commandQuestLog.bind(this));
        }
    };

    Scene_Menu.prototype.commandQuestLog = function() {
        QuestManager.openQuestLog();
    };

    class Window_QuestTracker extends Window_Base {
        standardPadding() {
            return QuestSystemParams.tracker.padding ?? super.standardPadding();
        }

        initialize(rect) {
            super.initialize(rect);
            this._entries = [];
            this._entriesKey = "";
            this._titleFontSize = QuestSystemParams.tracker.titleFontSize;
            this._objectiveFontSize = QuestSystemParams.tracker.objectiveFontSize;
            this._lineSpacing = QuestSystemParams.tracker.lineSpacing;
            this.opacity = QuestSystemParams.tracker.windowOpacity;
            this.backOpacity = QuestSystemParams.tracker.backgroundOpacity;
            this.visible = false;
            this._backgroundSprite = null;
            this._backgroundLayoutWidth = 0;
            this._backgroundLayoutHeight = 0;
            this.setupBackgroundSprite();
        }

        createContents() {
            super.createContents();
            this.refreshBackgroundSprite();
        }

        setEntries(entries) {
            const normalized = entries ? entries.slice() : [];
            const serialized = JSON.stringify(normalized);
            if (serialized === this._entriesKey) {
                this.visible = normalized.length > 0;
                return;
            }
            this._entriesKey = serialized;
            this._entries = normalized;
            this.refresh();
            this.visible = normalized.length > 0;
        }

        trackerMeasureText(text, baseFontSize, availableWidth) {
            const sanitizedWidth = Math.max(1, availableWidth || 1);
            const sanitizedText = typeof text === "string" ? text : String(text ?? "");
            const params = QuestSystemParams.tracker;
            if (!sanitizedText) {
                return {
                    fontSize: baseFontSize,
                    metrics: {
                        width: 0,
                        height: this.lineHeight()
                    }
                };
            }
            let fontSize = baseFontSize;
            if (params.autoScaleText) {
                this.resetFontSettings();
                this.contents.fontSize = baseFontSize;
                const baseMetrics = this.textSizeEx(sanitizedText);
                const rawWidth = Math.max(1, baseMetrics.width || 0);
                const scale = clamp(sanitizedWidth / rawWidth, params.textScaleMin, params.textScaleMax);
                fontSize = Math.max(8, Math.round(baseFontSize * scale));
            }
            this.resetFontSettings();
            this.contents.fontSize = fontSize;
            const metrics = this.textSizeEx(sanitizedText);
            this.resetFontSettings();
            return {
                fontSize,
                metrics
            };
        }

        estimateEntriesHeight(entries) {
            if (!entries || entries.length === 0) {
                return 0;
            }
            const width = this.contentsWidth();
            let height = 0;
            const lineSpacing = this._lineSpacing;
            entries.forEach((entry, index) => {
                if (index > 0) {
                    height += lineSpacing;
                }
                const titleInfo = this.trackerMeasureText(entry.title || "", this._titleFontSize, width);
                height += titleInfo.metrics.height || this.lineHeight();
                const objectiveWidth = Math.max(1, width - 12);
                const objectiveInfo = this.trackerMeasureText(entry.objectiveText || "", this._objectiveFontSize, objectiveWidth);
                height += objectiveInfo.metrics.height || this.lineHeight();
            });
            this.resetFontSettings();
            return height;
        }

        refresh() {
            this.contents.clear();
            let y = 0;
            const width = this.contentsWidth();
            const lineSpacing = this._lineSpacing;
            this._entries.forEach((entry, index) => {
                if (index > 0) {
                    y += lineSpacing;
                }
                this.resetFontSettings();
                const titleText = entry.title || "";
                const titleInfo = this.trackerMeasureText(titleText, this._titleFontSize, width);
                this.contents.fontSize = titleInfo.fontSize;
                this.changeTextColor(ColorManager.systemColor());
                this.drawTextEx(titleText, 0, y, width);
                y += titleInfo.metrics.height || this.lineHeight();
                this.resetTextColor();

                this.resetFontSettings();
                const objectiveWidth = Math.max(1, width - 12);
                const objectiveText = entry.objectiveText || "";
                const objectiveInfo = this.trackerMeasureText(objectiveText, this._objectiveFontSize, objectiveWidth);
                this.contents.fontSize = objectiveInfo.fontSize;
                if (entry.statusColor) {
                    this.changeTextColor(entry.statusColor);
                }
                this.drawTextEx(objectiveText, 12, y, objectiveWidth);
                y += objectiveInfo.metrics.height || this.lineHeight();
                this.resetTextColor();
            });
            this.resetFontSettings();
        }

        setupBackgroundSprite() {
            const imageName = QuestSystemParams.tracker.backgroundImage;
            if (!imageName) {
                return;
            }
            const sprite = new Sprite();
            this._backgroundSprite = sprite;
            this.addChildToBack(sprite);
            const bitmap = ImageManager.loadPicture(imageName);
            sprite.bitmap = bitmap;
            if (bitmap && bitmap.addLoadListener) {
                bitmap.addLoadListener(() => this.refreshBackgroundSprite());
            }
            this.refreshBackgroundSprite();
        }

        refreshBackgroundSprite() {
            if (!this._backgroundSprite || !this._backgroundSprite.bitmap) {
                return;
            }
            const targetWidth = Math.max(1, this.width);
            const targetHeight = Math.max(1, this.height);
            applyResponsiveSpriteLayout(
                this._backgroundSprite,
                targetWidth,
                targetHeight,
                QuestSystemParams.tracker.backgroundScaleMode
            );
            this._backgroundLayoutWidth = targetWidth;
            this._backgroundLayoutHeight = targetHeight;
        }

        update() {
            Window_Base.prototype.update.call(this);
            if (!this._backgroundSprite) {
                return;
            }
            if (this._backgroundLayoutWidth !== this.width || this._backgroundLayoutHeight !== this.height) {
                this.refreshBackgroundSprite();
            }
        }
    }

    const QuestTrackerManager = {
        window: null,
        dirty: true,
        entries: [],
        requestRefresh() {
            this.dirty = true;
        },
        ensureWindow() {
            const scene = SceneManager._scene;
            if (!(scene instanceof Scene_Map)) {
                return null;
            }
            if (this.window && this.window.parent !== scene._windowLayer) {
                this.window = null;
            }
            if (!this.window) {
                const params = QuestSystemParams.tracker;
                const widthLimit = Math.max(120, Math.min(params.width, Graphics.boxWidth));
                const x = clamp(params.x, 0, Math.max(0, Graphics.boxWidth - widthLimit));
                const screenHeightLimit = Math.max(80, Math.min(params.maxHeight, Graphics.boxHeight));
                const y = clamp(params.y, 0, Math.max(0, Graphics.boxHeight - 24));
                const height = Math.min(screenHeightLimit, Graphics.boxHeight - y);
                const rect = new Rectangle(x, y, widthLimit, height);
                const trackerWindow = new Window_QuestTracker(rect);
                trackerWindow.setEntries([]);
                scene.addWindow(trackerWindow);
                this.window = trackerWindow;
                this.dirty = true;
            }
            return this.window;
        },
        rebuildEntries() {
            QuestManager.ensureRuntime();
            const quests = QuestManager.getTrackedQuests();
            const maxEntries = QuestSystemParams.tracker.maxEntries || quests.length;
            const limited = quests.slice(0, maxEntries);
            const entries = limited.map((quest) => {
                const title = questDisplayTitle(quest);
                const primaryObjective = QuestManager.findPrimaryObjective(quest);
                let objectiveText = "";
                if (primaryObjective) {
                    if (primaryObjective.trackerText) {
                        objectiveText = QuestManager.renderObjectiveText(quest, primaryObjective, primaryObjective.trackerText);
                    }
                    if (!objectiveText) {
                        objectiveText = QuestManager.renderObjectiveText(quest, primaryObjective);
                    }
                }
                if (!objectiveText) {
                    objectiveText = QuestManager.getQuestStatusLabel(quest.status);
                }
                const statusColor = statusTextColor(quest.status);
                return {
                    questId: quest.id,
                    title,
                    objectiveText,
                    status: quest.status,
                    statusColor
                };
            });
            this.entries = entries;
        },
        applyEntries() {
            const win = this.ensureWindow();
            if (!win) {
                return;
            }
            const params = QuestSystemParams.tracker;
            const contentHeight = win.estimateEntriesHeight(this.entries);
            const fallbackContent = win.lineHeight() * 2;
            const rawHeight = (contentHeight > 0 ? contentHeight : fallbackContent) + win.padding * 2;
            const screenLimit = Graphics.boxHeight - win.y - 4;
            const maxHeight = Math.max(0, Math.min(params.maxHeight, screenLimit));
            const desiredHeight = Math.max(win.lineHeight() * 2 + win.padding * 2, Math.min(rawHeight, maxHeight));
            if (desiredHeight !== win.height) {
                win.move(win.x, win.y, win.width, desiredHeight);
                win.createContents();
                win._entriesKey = "";
            }
            win.setEntries(this.entries);
        },
        hideWindow() {
            if (this.window) {
                this.window.visible = false;
            }
        },
        update() {
            const scene = SceneManager._scene;
            if (!(scene instanceof Scene_Map)) {
                this.hideWindow();
                return;
            }
            this.ensureWindow();
            if (this.dirty) {
                this.rebuildEntries();
                this.applyEntries();
                this.dirty = false;
            }
        }
    };

    const _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
        if (typeof QuestManager !== "undefined" && QuestManager) {
            QuestManager.ensureRuntime();
            QuestManager.refreshAutoTrackedObjectives();
        }
        requestTrackerRefresh();
    };

    const _Game_Enemy_initialize = Game_Enemy.prototype.initialize;
    Game_Enemy.prototype.initialize = function(enemyId, x, y) {
        _Game_Enemy_initialize.call(this, enemyId, x, y);
        this._questKillCounted = false;
    };

    const _Game_Enemy_revive = Game_Enemy.prototype.revive;
    Game_Enemy.prototype.revive = function() {
        _Game_Enemy_revive.call(this);
        this._questKillCounted = false;
    };

    const _Game_Enemy_die = Game_Enemy.prototype.die;
    Game_Enemy.prototype.die = function() {
        if (!this._questKillCounted && this.isAppeared()) {
            QuestManager.ensureRuntime();
            QuestManager.recordEnemyKill(this.enemyId());
            this._questKillCounted = true;
        }
        _Game_Enemy_die.call(this);
    };

    class QuestToastWindow extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._message = "";
            this._duration = 0;
            this.opacity = 0;
            this.contentsOpacity = 0;
            
            // Применяем настройки прозрачности
            this.setBackgroundType(0); // Нормальное окно
            
            // Настройка размера шрифта
            if (QuestSystemParams.notifications.fontSize > 0) {
                this.contents.fontSize = QuestSystemParams.notifications.fontSize;
            } else {
                this.contents.fontSize = Math.max(18, this.contents.fontSize - 4);
            }
        }

        update() {
            super.update();
            if (this._duration > 0) {
                this._duration--;
                if (this._duration <= 0) {
                    this.hideMessage();
                }
            }
        }

        showMessage(message, duration) {
            this._message = message;
            this._duration = duration;
            this.refresh();
            this.opacity = QuestSystemParams.notifications.windowOpacity;
            this.contentsOpacity = QuestSystemParams.notifications.backgroundOpacity;
        }

        hideMessage() {
            this._message = "";
            this._duration = 0;
            this.contents.clear();
            this.opacity = 0;
            this.contentsOpacity = 0;
        }

        isBusy() {
            return this._duration > 0;
        }

        refresh() {
            this.contents.clear();
            if (this._message) {
                const x = this.padding;
                const y = 0;
                const width = this.contentsWidth();
                this.drawTextEx(this._message, x, y, width);
            }
        }
    }

    const QuestNotifications = {
        queue: [],
        window: null,
        duration: QuestSystemParams.notifications.duration,
        enqueue(payload) {
            // Проверяем, включены ли уведомления
            if (!QuestSystemParams.notifications.enabled) {
                return;
            }
            
            const message = this.formatPayload(payload);
            if (!message) {
                return;
            }
            this.queue.push(message);
            this.processQueue();
        },
        formatPayload(payload) {
            if (!payload || !payload.quest) {
                return "";
            }
            const quest = payload.quest;
            const title = questDisplayTitle(quest).replace(/\n/g, " ");
            
            const iconOrEmpty = (status) => {
                if (!QuestSystemParams.notifications.showIcon) {
                    return "";
                }
                const icon = statusIconIndex(status);
                return icon ? `\\I[${icon}] ` : "";
            };
            
            const params = QuestSystemParams.notifications.text;
            
            switch (payload.type) {
                case "objective": {
                    const objective = payload.objective;
                    if (!objective) {
                        return "";
                    }
                    const renderedObjective = QuestManager.renderObjectiveText(quest, objective, objective.trackerText);
                    const baseObjectiveText = renderedObjective || objective.text || objective.id || "";
                    const cleanObjective = String(baseObjectiveText).replace(/\n/g, " ");
                    
                    // Форматируем шаблон: %1 = название квеста, %2 = описание цели
                    let text = params.objectiveComplete;
                    text = text.replace(/%1/g, title);
                    text = text.replace(/%2/g, cleanObjective);
                    
                    return iconOrEmpty(STATUS.COMPLETED) + text;
                }
                case "questComplete": {
                    // Форматируем шаблон: %1 = название квеста
                    let text = params.questComplete;
                    text = text.replace(/%1/g, title);
                    
                    return iconOrEmpty(STATUS.COMPLETED) + text;
                }
                case "questFailed": {
                    // Форматируем шаблон: %1 = название квеста
                    let text = params.questFailed;
                    text = text.replace(/%1/g, title);
                    
                    return iconOrEmpty(STATUS.FAILED) + text;
                }
                default:
                    return "";
            }
        },
        ensureWindow() {
            const scene = SceneManager._scene;
            if (!(scene instanceof Scene_Map)) {
                return null;
            }
            if (this.window && this.window.parent !== scene._windowLayer) {
                this.window = null;
            }
            if (!this.window) {
                const config = QuestSystemParams.notifications;
                const width = Math.min(config.width, Graphics.boxWidth - 48);
                const height = config.height;
                
                // Позиция X: если -1, то автоматически справа
                const x = config.x >= 0 
                    ? config.x 
                    : Graphics.boxWidth - width - 24;
                const y = config.y;
                
                const rect = new Rectangle(x, y, width, height);
                const toastWindow = new QuestToastWindow(rect);
                scene.addWindow(toastWindow);
                this.window = toastWindow;
            }
            return this.window;
        },
        processQueue() {
            if (this.queue.length === 0) {
                return;
            }
            const win = this.ensureWindow();
            if (!win) {
                return;
            }
            if (!win.isBusy()) {
                const message = this.queue.shift();
                win.showMessage(message, this.duration);
            }
        },
        update() {
            const win = this.window;
            if (win && !win.parent) {
                this.window = null;
            }
            if (this.queue.length > 0) {
                this.processQueue();
            }
        }
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (typeof window !== "undefined") {
            const tracker = window.QuestTrackerManager;
            if (tracker && typeof tracker.update === "function") {
                tracker.update();
            }
        }
        QuestNotifications.update();
    };

    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        QuestManager.setupGameSystem($gameSystem);
        requestTrackerRefresh();
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        // Устанавливаем флаг загрузки чтобы не вызывать триггеры для уже выполненных целей
        QuestManager._isLoadingFromSave = true;
        QuestManager.setupGameSystem($gameSystem);
        requestTrackerRefresh();
        // Сбрасываем флаг после загрузки
        QuestManager._isLoadingFromSave = false;
    };

    window.QuestTrackerManager = QuestTrackerManager;

})();
