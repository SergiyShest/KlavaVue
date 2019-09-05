using System;
using System.Collections.Generic;
using     System.Web.Mvc;


static class Extensions {

    public static string GetFullErrorMessage(this ModelStateDictionary modelState) {
        var messages = new List<string>();

        foreach(var entry in modelState) {
            foreach(var error in entry.Value.Errors)
                messages.Add(error.ErrorMessage);
        }

        return String.Join(" ", messages);
    }

}
#region Assembly UBP.Core, Version=2.8.14.0, Culture=neutral, PublicKeyToken=null
// location unknown
// Decompiled with ICSharpCode.Decompiler 4.0.0.4521
#endregion

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Security;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;
using UBP.Business.Core;
using UBP.Common;
using UBP.Core.Extensions;
using UBP.Protocol.Core;

namespace UBP.Core
{
    //
    // Summary:
    //     /// Статический класс для работы с XML ///
    [Author(Developer.Shestakov)]
    public static class XMLHelper
    {
        public static bool Compare(this XmlNode node1, XmlNode node2, ref string error, string path, List<string> ignoreNames, List<string> ignoreBy0Names)
        {
            path = path + "=>" + node1.Name;
            if (node1.Name != node2.Name)
            {
                error += string.Format("{2}Разные имена узлов '{0}' и '{1}'  ", node1.Name, node2.Name, path);
            }
            if (node1.ChildNodes.Count != node2.ChildNodes.Count)
            {
                int num = 0;
                int num2 = 0;
                foreach (XmlNode childNode in node1.ChildNodes)
                {
                    if (!ignoreNames.Exist(childNode.Name))
                    {
                        num++;
                    }
                }
                foreach (XmlNode childNode2 in node2.ChildNodes)
                {
                    if (!ignoreNames.Exist(childNode2.Name))
                    {
                        num2++;
                    }
                }
                if (num != num2)
                {
                    error += string.Format("{3} У узла '{0}' разное количестово дочерних узлов '{1}' и '{2}' \n ", node1.Name, node1.ChildNodes.Count, node2.ChildNodes.Count, path);
                }
            }
            if (node1.Attributes != null && node2.Attributes == null)
            {
                error += string.Format("{1} Отсутствуют атрибуты у узла '{0}'", node2.Name, path);
            }
            if (node1.Attributes == null && node2.Attributes != null)
            {
                error += string.Format("{1} Отсутствуют атрибуты у узла '{0}'", node2.Name, path);
            }
            if (node1.Attributes != null && node2.Attributes != null && node1.Attributes.Count != node2.Attributes.Count)
            {
                int num3 = 0;
                int num4 = 0;
                foreach (XmlAttribute attribute in node1.Attributes)
                {
                    if (!ignoreNames.Exist(attribute.Name) && (!ignoreBy0Names.Exist(attribute.Name) || !(attribute.Value == "0") || node2.Attributes.Exist(attribute.Name)))
                    {
                        num3++;
                    }
                }
                foreach (XmlAttribute attribute2 in node2.Attributes)
                {
                    if (!ignoreNames.Exist(attribute2.Name) && (!ignoreBy0Names.Exist(attribute2.Name) || !(attribute2.Value == "0") || node1.Attributes.Exist(attribute2.Name)))
                    {
                        num4++;
                    }
                }
                if (num3 != num4)
                {
                    error += string.Format("{3} Разное количество  атрибутов у узла '{0}' '{1}' и '{2}'\n", node2.Name, node1.Attributes.Count, node2.Attributes.Count, path);
                }
            }
            if (node1.Attributes != null)
            {
                for (int i = 0; i < node1.Attributes.Count; i++)
                {
                    XmlAttribute xmlAttribute3 = node1.Attributes[i];
                    try
                    {
                        if (!ignoreBy0Names.Exist(xmlAttribute3.Name) || !(xmlAttribute3.Value == "0"))
                        {
                            XmlAttribute xmlAttribute4 = node2.Attributes[xmlAttribute3.Name];
                            bool flag = false;
                            foreach (string ignoreName in ignoreNames)
                            {
                                if (ignoreName == xmlAttribute3.Name)
                                {
                                    flag = true;
                                    break;
                                }
                            }
                            if (!flag && xmlAttribute3.Value.Replace("\\r", string.Empty) != xmlAttribute4.Value.Replace("\\r", string.Empty))
                            {
                                error += string.Format("{4} Разные значения у  атрибута '{1}'  у узла '{0}' '{2}' и '{3}' \n", node2.Name, xmlAttribute3.Name, xmlAttribute3.Value, xmlAttribute4.Value, path);
                            }
                        }
                    }
                    catch
                    {
                        error += string.Format("{2} Отсутствует атрибут '{1}'  у узла '{0}'\n", node2.Name, xmlAttribute3.Name, path);
                    }
                }
            }
            for (int j = 0; j < node1.ChildNodes.Count; j++)
            {
                XmlNode xmlNode3 = node1.ChildNodes[j];
                XmlNode xmlNode4 = node2.ChildNodes[j];
                if (xmlNode3 is XmlText && xmlNode4 is XmlText && !ignoreNames.Exist(node1.Name))
                {
                    if (xmlNode3.Value.Replace("\\r", string.Empty) != xmlNode4.Value.Replace("\\r", string.Empty))
                    {
                        error += string.Format("{3} У узла '{0}' разные значения '{1}' и '{2}' \n", node2.Name, xmlNode3.Value, xmlNode4.Value, path);
                    }
                }
                else if (xmlNode4 == null)
                {
                    error += string.Format("{2} У узла '{0}' разные значения '{1}' null  \n", node2.Name, xmlNode3.Value, path);
                }
                else if (xmlNode3.Compare(xmlNode4, ref error, path, ignoreNames, ignoreBy0Names))
                {
                }
            }
            return true;
        }

        //
        // Summary:
        //     /// сравнение двух XML ///
        //
        // Parameters:
        //   node1:
        //
        //   node2:
        //
        //   error:
        //
        //   ignoreAttributeNames:
        public static bool Compare(this XmlNode node1, XmlNode node2, ref string error, params string[] ignoreAttributeNames)
        {
            string empty = string.Empty;
            node1.Compare(node2, ref error, empty, ignoreAttributeNames.ToList(), new List<string>());
            return string.IsNullOrWhiteSpace(error);
        }

        //
        // Summary:
        //     /// безопасное получение аттрибута ///
        //
        // Parameters:
        //   xml:
        //
        //   attrName:
        //
        //   ret:
        public static decimal GetAttrDecimal(this XmlNode xml, string attrName, decimal ret = 0m)
        {
            string attrSafety = xml.GetAttrSafety(attrName);
            if (attrSafety != null)
            {
                decimal.TryParse(attrSafety, out ret);
            }
            return ret;
        }

        //
        // Summary:
        //     /// безопасное получение аттрибута ///
        //
        // Parameters:
        //   xml:
        //
        //   attrName:
        public static string GetAttrSafety(this XmlNode xml, string attrName)
        {
            if (xml != null && xml.Attributes != null)
            {
                XmlAttribute xmlAttribute = xml.Attributes[attrName];
                if (xmlAttribute != null)
                {
                    return xmlAttribute.Value;
                }
            }
            return string.Empty;
        }

        //
        // Summary:
        //     /// безопасное получение Значения ///
        //
        // Parameters:
        //   xml:
        //
        //   nodeName:
        public static string GetValueSafety(this XmlNode xml, string nodeName)
        {
            if (xml == null)
            {
            }
            XmlNode xmlNode = xml.SelectSingleNode(nodeName);
            if (xmlNode != null)
            {
                return xmlNode.InnerText;
            }
            return string.Empty;
        }

        //
        // Summary:
        //     /// безопасное получение значения ///
        //
        // Parameters:
        //   xml:
        //
        //   nodeName:
        public static decimal GetValueDecimal(this XmlNode xml, string nodeName)
        {
            decimal result = default(decimal);
            XmlNode xmlNode = xml.SelectSingleNode(nodeName);
            if (xmlNode != null)
            {
                decimal.TryParse(xmlNode.InnerText, out result);
            }
            return result;
        }

        //
        // Summary:
        //     /// безопасная установка значения аттрибута ///
        //
        // Parameters:
        //   xml:
        //
        //   attrName:
        //
        //   val:
        public static void SetAttr(this XmlNode xml, string attrName, object val)
        {
            if (val != null)
            {
                XmlAttribute xmlAttribute = xml.Attributes[attrName];
                if (xmlAttribute != null)
                {
                    xmlAttribute.Value = val.ToString();
                    return;
                }
                XmlAttribute xmlAttribute2 = xml.OwnerDocument.CreateAttribute(attrName);
                xml.Attributes.Append(xmlAttribute2);
                xmlAttribute2.Value = val.ToString();
            }
        }

        //
        // Summary:
        //     /// установка значения узла ///
        //
        // Parameters:
        //   xml:
        //
        //   xPath:
        //
        //   val:
        //
        //   createNewIfNotFind:
        public static void SetText(this XmlNode xml, string xPath, string val, bool createNewIfNotFind = true)
        {
            if (val == null)
            {
                return;
            }
            XmlNode xmlNode = xml.SelectSingleNode(xPath);
            if (xmlNode == null)
            {
                if (!createNewIfNotFind)
                {
                    throw new Exception("Не найден узел" + xPath);
                }
                xmlNode = xml.CreateXmlNode(xPath);
            }
            if (xmlNode != null)
            {
                xmlNode.InnerText = val;
            }
        }

        //
        // Summary:
        //     /// безопасная установка значения аттрибута ///
        //
        // Parameters:
        //   xml:
        //
        //   attrName:
        public static bool SetAttrSafety(this XmlNode xml, string attrName, object val)
        {
            XmlAttribute xmlAttribute = xml.Attributes[attrName];
            if (xmlAttribute != null)
            {
                xmlAttribute.Value = val.ToString();
                return true;
            }
            return false;
        }

        //
        // Summary:
        //     /// установка значения атрибута или текста тега в зависимости от параметра newSt
        //     ///
        //
        // Parameters:
        //   xml:
        //
        //   name:
        //
        //   value:
        //
        //   newSt:
        public static void SetValueToWay(XmlNode xml, string name, string value, bool newSt)
        {
            if (newSt)
            {
                xml.SetText(name, value);
            }
            else
            {
                xml.SetAttrSafety(name, value);
            }
        }

        //
        // Summary:
        //     /// безопасная установка значения аттрибута ///
        //
        // Parameters:
        //   xml:
        //
        //   attrName:
        public static void SetOrCreateAttr(this XmlNode xml, string attrName, string val)
        {
            XmlAttribute xmlAttribute = xml.Attributes[attrName];
            if (xmlAttribute != null)
            {
                xmlAttribute.Value = val;
                return;
            }
            XmlAttribute xmlAttribute2 = xml.OwnerDocument.CreateAttribute(attrName);
            xml.Attributes.Append(xmlAttribute2);
            xmlAttribute2.Value = val;
        }

        //
        // Summary:
        //     /// проверка наличия атрибута ///
        //
        // Parameters:
        //   xmlAttributeCollection:
        //
        //   attrName:
        public static bool Exist(this XmlAttributeCollection xmlAttributeCollection, string attrName)
        {
            foreach (XmlAttribute item in xmlAttributeCollection)
            {
                if (item.Name == attrName)
                {
                    return true;
                }
            }
            return false;
        }

        public static Attribute GetFirstAttr(this Attribute[] attrs, Type T)
        {
            foreach (Attribute attribute in attrs)
            {
                if (attribute.GetType() == T)
                {
                    return attribute;
                }
            }
            return null;
        }

        public static List<Attribute> GetAttrList(this Attribute[] attrs, Type T)
        {
            List<Attribute> list = new List<Attribute>();
            foreach (Attribute attribute in attrs)
            {
                if (attribute.GetType() == T)
                {
                    list.Add(attribute);
                }
            }
            return list;
        }

        //
        // Summary:
        //     /// вернет первый метод помеченный атрибутом ///
        //
        // Parameters:
        //   methodInfos:
        //
        //   attr:
        public static MethodInfo GetMethodMarkedAttr(MethodInfo[] methodInfos, Type attr)
        {
            MethodInfo result = null;
            foreach (MethodInfo methodInfo in methodInfos)
            {
                Attribute firstAttr = Attribute.GetCustomAttributes(methodInfo).GetFirstAttr(attr);
                if (firstAttr != null)
                {
                    result = methodInfo;
                }
            }
            return result;
        }

        //
        // Summary:
        //     /// экранизация символов что бы Хамл можно было вставить в xml ///
        //
        // Parameters:
        //   XML:
        public static string XmlEscape(this string XML)
        {
            return SecurityElement.Escape(XML);
        }

        //
        // Summary:
        //     /// добавление узла по простому свойству ///
        //
        // Parameters:
        //   parent:
        //
        //   property:
        //
        // Type parameters:
        //   T:
        public static void AppendToXmlSimpleProterty<T>(this XmlNode parent, Expression<Func<T>> property)
        {
            T val = property.PropertyValue();
            if (val != null)
            {
                parent.AppendToXmlProperty(property, val.ToString());
            }
        }

        public static T PropertyValue<T>(this Expression<Func<T>> property)
        {
            Func<T> func = property.Compile();
            return func();
        }

        //
        // Summary:
        //     /// добавление узла по свойству когда значение не может быть полученно непосредственно
        //     из свойства ///
        //
        // Parameters:
        //   parent:
        //
        //   property:
        //
        //   val:
        //
        // Type parameters:
        //   T:
        public static void AppendToXmlProperty<T>(this XmlNode parent, Expression<Func<T>> property, string val)
        {
            XmlElement xmlElement = parent.OwnerDocument.CreateElement(property.PropertyName());
            XmlText newChild = parent.OwnerDocument.CreateTextNode(val);
            xmlElement.AppendChild(newChild);
            parent.AppendChild(xmlElement);
        }

        //
        // Summary:
        //     /// добавление узла по свойству без установки значения ///
        //
        // Parameters:
        //   parent:
        //
        //   property:
        //
        // Type parameters:
        //   T:
        public static XmlNode CreateXmlPropertyNode<T>(this XmlNode parent, Expression<Func<T>> property)
        {
            return parent.CreateXmlNode(property.PropertyName());
        }

        //
        // Summary:
        //     /// добавление узла по имени без установки значения ///
        //
        // Parameters:
        //   parent:
        //
        //   name:
        public static XmlNode CreateXmlNode(this XmlNode parent, string name)
        {
            XmlDocument xmlDocument = (parent.OwnerDocument == null) ? (parent as XmlDocument) : parent.OwnerDocument;
            XmlElement xmlElement = xmlDocument.CreateElement(name);
            parent.AppendChild(xmlElement);
            return xmlElement;
        }

        //
        // Summary:
        //     /// получение узла по имени свойтва ///
        //
        // Parameters:
        //   parent:
        //
        //   property:
        //
        // Type parameters:
        //   T:
        public static XmlNode GetXmlPropertyNode<T>(this XmlNode parent, Expression<Func<T>> property)
        {
            return parent.SelectSingleNode(property.PropertyName());
        }

        //
        // Summary:
        //     /// Добавление коллекции ///
        //
        // Parameters:
        //   parent:
        //
        //   property:
        //
        // Type parameters:
        //   T:
        public static void AppendCollection<T>(this XmlNode parent, Expression<Func<T>> property)
        {
            string propertyName = property.PropertyName();
            T propVal = property.PropertyValue();
            parent.AppendCollection(propertyName, propVal);
        }

        //
        // Summary:
        //     /// ///
        //
        // Parameters:
        //   parent:
        //
        //   propertyName:
        //
        //   propVal:
        //
        // Type parameters:
        //   T:
        public static void AppendCollection<T>(this XmlNode parent, string propertyName, T propVal)
        {
            XmlElement xmlElement = parent.OwnerDocument.CreateElement(propertyName);
            parent.AppendChild(xmlElement);
            if (propVal != null)
            {
                IEnumerable enumerable = propVal as IEnumerable;
                if (enumerable == null)
                {
                    throw new Exception($"{propertyName} должно быть IEnumerable");
                }
                foreach (object item in enumerable)
                {
                    if (item != null)
                    {
                        RBaseObject rBaseObject = item as RBaseObject;
                        if (rBaseObject == null)
                        {
                        }
                        if (!(rBaseObject?.Deleted ?? true))
                        {
                            rBaseObject.AppendToXML(xmlElement);
                        }
                    }
                }
            }
        }

        //
        // Summary:
        //     /// Загрузка коллекции ///
        //
        // Parameters:
        //   parent:
        //
        //   propertyCollection:
        //     функция возвращающая коллекцию
        //
        //   itemType:
        //     базовый тип элемента коллекции, если нул то тип берется из типа элемента коллекции
        //
        //   constructorParam:
        //     параметры конструктора элемента коллекци
        //
        // Type parameters:
        //   T:
        public static void LoadCollection<T>(this XmlNode parent, Expression<Func<T>> propertyCollection, Type itemType = null, params object[] constructorParam) where T : IList
        {
            string propName = propertyCollection.PropertyName();
            T collection = propertyCollection.PropertyValue();
            parent.LoadCollection(null, itemType, null, collection, propName, constructorParam);
        }

        //
        // Summary:
        //     /// Загрузка коллекции из xml ///
        //
        // Parameters:
        //   parent:
        //
        //   baseObject:
        //
        //   itemType:
        //
        //   methodInfo:
        //
        //   collection:
        //
        //   propName:
        //
        //   constructorParam:
        //
        // Type parameters:
        //   T:
        public static void LoadCollection<T>(this XmlNode parent, object baseObject, Type itemType, MethodInfo methodInfo, T collection, string propName, params object[] constructorParam) where T : IList
        {
            if (collection != null)
            {
                if (itemType == null && methodInfo == null)
                {
                    itemType = collection.GetGenericType();
                }
                XmlNode xmlNode = parent.SelectSingleNode(propName);
                if (xmlNode != null)
                {
                    foreach (XmlNode childNode in xmlNode.ChildNodes)
                    {
                        RBaseObject rBaseObject = (!(methodInfo == null)) ? (methodInfo.Invoke(baseObject, new object[1]
                        {
                            childNode
                        }) as RBaseObject) : (itemType.GetInstance(constructorParam) as RBaseObject);
                        if (rBaseObject == null)
                        {
                            throw new Exception(itemType.Name + " должен быть RBaseObject");
                        }
                        rBaseObject.LoadFromXML(childNode);
                        collection.Add(rBaseObject);
                    }
                }
            }
        }

        //
        // Summary:
        //     /// получение типа элемента коллекции ///
        //
        // Parameters:
        //   enumerable:
        public static Type GetGenericType(this IEnumerable enumerable)
        {
            Type result = null;
            Type[] interfaces = enumerable.GetType().GetInterfaces();
            Type[] array = interfaces;
            foreach (Type type in array)
            {
                if (type.IsGenericType && type.GetGenericTypeDefinition().Equals(typeof(IEnumerable<>)))
                {
                    result = type.GetGenericArguments()[0];
                    break;
                }
            }
            return result;
        }

        //
        // Summary:
        //     /// форматирование xml ///
        //
        // Parameters:
        //   xml:
        //
        //   error:
        public static string FormatXml(string xml, out string error)
        {
            Regex regex = new Regex("\\sxmlns(?=\\s*\\=)|\\sxmlns(?=\\:\\w*\\s*\\=)");
            Regex regex2 = new Regex("<(/?)(\\w+):");
            string text = "fdgsfdsgsghdfg";
            xml = regex2.Replace(xml, "<$1$2" + text);
            string text2 = "";
            error = "";
            MemoryStream memoryStream = new MemoryStream();
            XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, Encoding.Unicode);
            XmlDocument xmlDocument = new XmlDocument();
            try
            {
                xmlDocument.LoadXml(xml);
                xmlTextWriter.Formatting = Formatting.Indented;
                xmlDocument.WriteContentTo(xmlTextWriter);
                xmlTextWriter.Flush();
                memoryStream.Flush();
                memoryStream.Position = 0L;
                StreamReader streamReader = new StreamReader(memoryStream);
                string text3 = streamReader.ReadToEnd();
                text2 = text3;
                text2 = regex.Replace(text2, " \r\nxmlns");
                text2 = text2.Replace(text, ":");
            }
            catch (XmlException ex)
            {
                error = ex.Message;
                text2 = xml;
            }
            finally
            {
                try
                {
                    memoryStream.Close();
                    xmlTextWriter.Close();
                }
                catch
                {
                }
            }
            return text2;
        }

        //
        // Summary:
        //     /// форматирование xml ///
        //
        // Parameters:
        //   xml:
        public static string FormatXml(string xml)
        {
            string error;
            string result = FormatXml(xml, out error);
            if (string.IsNullOrEmpty(error))
            {
                return result;
            }
            throw new Exception(error);
        }

        //
        // Summary:
        //     /// ///
        //
        // Parameters:
        //   xml:
        public static string FormatXml2(string xml)
        {
            try
            {
                XDocument xDocument = XDocument.Parse(xml);
                return xDocument.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //
        // Summary:
        //     /// оборачивает объект оберткой с идентификатом и типом ///
        //
        // Parameters:
        //   rObject:
        //
        //   parent:
        public static XmlNode AppendXmlWrapper(this IOverloadedObject rObject, XmlNode parent)
        {
            return rObject.AppendXmlWrapper(parent, null);
        }

        //
        // Summary:
        //     /// оборачивает объект оберткой с идентификатом и типом ///
        //
        // Parameters:
        //   rObject:
        //
        //   parent:
        //
        //   protocol:
        public static XmlNode AppendXmlWrapper(this IOverloadedObject rObject, XmlNode parent, IProtocol protocol)
        {
            XmlNode xmlNode = parent.CreateXmlNode("XmlWrapper");
            XmlNode xmlNode2 = xmlNode.CreateXmlNode("Object");
            XmlDocument xml = rObject.GetXml();
            string text = rObject.ID.ToString("###0");
            string text2 = rObject.TypeID.ToString("###0");
            if (xml.DocumentElement != null)
            {
                xmlNode2.InnerXml = xml.DocumentElement.OuterXml;
            }
            xmlNode2.SetOrCreateAttr("TypeID", text2);
            xmlNode2.SetOrCreateAttr("ID", text);
            if (rObject != null && !rObject.New && rObject.TypeID != 0L && rObject.TypeID != 3)
            {
                string text3 = rObject.IdentifierObject.ToString();
                if (!string.IsNullOrEmpty(text3))
                {
                    string guid = ObjectHelper.GuidServ.GetGuid(text3, rObject.TypeID);
                    xmlNode2.SetOrCreateAttr("Guid", guid);
                }
            }
            try
            {
                IList<IBDObjectReference> referencesOnUsedObjects = rObject.GetReferencesOnUsedObjects();
                if (referencesOnUsedObjects.Count > 0)
                {
                    XmlNode parent2 = xmlNode.CreateXmlNode("UsedObjects");
                    foreach (IBDObjectReference item in referencesOnUsedObjects)
                    {
                        XmlNode xmlNode3 = parent2.CreateXmlNode("ObjectRef");
                        xmlNode3.SetOrCreateAttr("TypeID", item.TypeID.ToString("####"));
                        xmlNode3.SetOrCreateAttr("ID", item.ID.ToString("####"));
                        try
                        {
                            if (!(item.ID == decimal.Zero))
                            {
                                string guid2 = ObjectHelper.GuidServ.GetGuid(item.ID, item.TypeID);
                                xmlNode3.SetOrCreateAttr("Guid", guid2);
                                goto IL_0201;
                            }
                        }
                        catch (Exception ex)
                        {
                            REnvironment.Current.Protocol.PutExceptionMessage(ex);
                            xmlNode3.SetText("GuidError", ex.ToString());
                            goto IL_0201;
                        }
                        continue;
                    IL_0201:
                        if (item.TypeID == 616)
                        {
                            try
                            {
                                string val = item.GetObjectSubItem("ShortName").ToString();
                                xmlNode3.SetOrCreateAttr("ShortName", val);
                            }
                            catch (Exception ex2)
                            {
                                REnvironment.Current.Protocol.PutExceptionMessage(ex2);
                            }
                        }
                        (item.GetObjectSubItem("TagObject") as RBaseObject)?.AppendToXML(xmlNode3);
                    }
                }
            }
            catch (Exception innerException)
            {
                REnvironment.Current.Protocol.PutExceptionMessage(new Exception($"Объект ID={text} TypeID={text2} oшибка получения используемых объектов", innerException));
            }
            parent.AppendChild(xmlNode);
            return xmlNode;
        }

        //
        // Summary:
        //     /// получение объекта в виде Xml String ///
        //
        // Parameters:
        //   obj:
        //
        //   rootName:
        public static string GetXmlString(RBaseObject obj, string rootName)
        {
            XmlDocument xDoc;
            return GetXmlString(obj, out xDoc, rootName);
        }

        //
        // Summary:
        //     /// получение объекта в виде Xml String ///
        //
        // Parameters:
        //   conditionNode:
        //
        //   xDoc:
        //
        //   rootName:
        public static string GetXmlString(RBaseObject conditionNode, out XmlDocument xDoc, string rootName)
        {
            xDoc = new XmlDocument();
            xDoc.AppendChild(xDoc.CreateElement(rootName));
            conditionNode.AppendToXML(xDoc.DocumentElement);
            string error;
            return FormatXml(xDoc.OuterXml, out error);
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using NUnit.Framework;
using UBP.Business.Financial.Internal.Service;
using UBP.Business.Financial.TypicalOperationDocument.Centura2CSharp;
using UBP.BusinessFactory;
using UBP.Common;
using UBP.Common.Tests.Helpers;
using UBP.Core;
using UBP.Core.Extensions;
using UBP.Object.Tests.ObjectTestsForTransfer;

using UBP.TypeManager;
using UBP.TypeManager.Overloader;
using UBP.TypeManager.Report;

namespace UBP.Object.Tests
{

    /// <summary>
    /// Набор тестов объекта схема разоложения
    /// </summary>
    [TestFixture]
    public class FinancialAccountingSxemaTests : ObjectTestsBase
    {
        #region  Тестируемый тип FinancialAccountingSxema

        private static long _objType = (long)RObjectStandardTypes.FinancialAccountingSxema;

        /// <summary>
        /// Тестируемый тип
        /// </summary>
        public override long TestedType
        {
            get { return _objType; }
        }

        #endregion

        #region CutDifferenceRegex
        private Regex _cutDifferenceRegex =
            new Regex(@"<ID>(\d+)</ID>|" +
@"<AddInfo>(.*?)</AddInfo>|" +// допинформация не нужна
@"<AnalyticalSignCollection>(.*?)</AnalyticalSignCollection>|" +//коллекция аналитиченских признаков
@"<FinDocType>(\d+)</FinDocType>|" +//id операционного документа
@"(?<=<Formula>\d+:\d+:\d+\.)(-?\d+)"//подавляю ошибку в интерпретации формулы
, RegexOptions.Multiline | RegexOptions.Singleline);
        protected override Regex CutDifferenceRegex
        {
            get { return _cutDifferenceRegex; }
            set { _cutDifferenceRegex = value; }
        }

        #endregion

        #region GetConflictsTest

        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]

        public void GetConflictsTest(decimal id)
        {
            TestedObject = RBusinessObjectFactory.Current.CreateObject(id, TestedType) as RFinancialAccountingSxema;
            var conflicts = TestedObject.GetConflicts();
            Assert.That(conflicts.Count == 1);
        }


        #endregion

        #region  Xml Quick And Long tests

        [NUnit.Framework.Category("Quick")]
        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]
        public void XmlFinancialAccountingQuickTest(decimal id)
        {
            base.XmlTestFull(TestedType, id, false, true);
            var f = base.TestedObject as RFinancialAccountingSxema;
            var fx = base.TestedObject as RFinancialAccountingSxema;

            // Список шаблонов назначений
            // Assert.AreEqual(f.a.Count, fx.AssignmentTemplateCollection.Count);
            // Список аналитических признаков
            Assert.AreEqual(f.AnalyticalSignCollection.Count, fx.AnalyticalSignCollection.Count);

            // Коллекция счетов схемы разложения
            Assert.AreEqual(f.AccountDefinitionCollection.Count, fx.AccountDefinitionCollection.Count);

            // Коллекция сумм
            Assert.AreEqual(f.SummCollection.Count, fx.SummCollection.Count);

            // Коллекция проводок схемы разложения

            Assert.AreEqual(f.TypicalWireCollection.Count, fx.TypicalWireCollection.Count);

            // Коллекция шаблонов для выписки по карте
            Assert.AreEqual(f.CardDetailTemplateCollection.Count, fx.CardDetailTemplateCollection.Count);

            // Коллекция критериев корретности операционного документа
            Assert.AreEqual(f.ValidationRulesCollection.Count, fx.ValidationRulesCollection.Count);

            // Коллекция критериев определения групп курсовых ставок
            Assert.AreEqual(f.CourseRateCriteriaDefinitionCollection.Count, fx.CourseRateCriteriaDefinitionCollection.Count);

            // Коллекция шаблонов для реестра валютных операций
            Assert.AreEqual(f.CurrencyReestrTemplateCollection.Count, fx.CurrencyReestrTemplateCollection.Count);

            // Коллекция шаблонов для налогового учета
            Assert.AreEqual(f.TaxAccountingDetailTemplateCollection.Count, fx.TaxAccountingDetailTemplateCollection.Count);

        }

        [NUnit.Framework.Category("Quick")]
        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]

        public void XmlTest(decimal id)
        {
            base.XmlTestFull(TestedType, id, true, true);
            var f = base.TestedObject as RFinancialAccountingSxema;
            var fx = base.TestedObject as RFinancialAccountingSxema;

            // Список шаблонов назначений
            //   Assert.AreEqual(f.AssignmentTemplateCollection.Count, fx.AssignmentTemplateCollection.Count);
            // Список аналитических признаков
            Assert.AreEqual(f.AnalyticalSignCollection.Count, fx.AnalyticalSignCollection.Count);

            // Коллекция счетов схемы разложения
            Assert.AreEqual(f.AccountDefinitionCollection.Count, fx.AccountDefinitionCollection.Count);

            // Коллекция сумм
            Assert.AreEqual(f.SummCollection.Count, fx.SummCollection.Count);

            // Коллекция проводок схемы разложения

            Assert.AreEqual(f.TypicalWireCollection.Count, fx.TypicalWireCollection.Count);

            // Коллекция шаблонов для выписки по карте
            Assert.AreEqual(f.CardDetailTemplateCollection.Count, fx.CardDetailTemplateCollection.Count);

            // Коллекция критериев корретности операционного документа
            Assert.AreEqual(f.ValidationRulesCollection.Count, fx.ValidationRulesCollection.Count);

            // Коллекция критериев определения групп курсовых ставок
            Assert.AreEqual(f.CourseRateCriteriaDefinitionCollection.Count, fx.CourseRateCriteriaDefinitionCollection.Count);

            // Коллекция шаблонов для реестра валютных операций
            Assert.AreEqual(f.CurrencyReestrTemplateCollection.Count, fx.CurrencyReestrTemplateCollection.Count);

            // Коллекция шаблонов для налогового учета
            Assert.AreEqual(f.TaxAccountingDetailTemplateCollection.Count, fx.TaxAccountingDetailTemplateCollection.Count);

        }

        [Test, TestCaseSource("GetAllFinancialAccountingSxema"), NUnit.Framework.Category("Long")]
        public void XmlFinancialAccountingTest(decimal id)
        {
            XmlTest(id);
        }

        [STAThread]
        //[TestCase(10031)]
        [Test, TestCaseSource("GetAllFinancialAccountingSxema"), NUnit.Framework.Category("Long")]
        public void XmlFinancialAccountingCompareTest(decimal id)
        {
            ObjectTestsBaseStatic.XmlTest(new RLightWeightObjectRefernce(id, TestedType), true);
        }



        #endregion

        #region Merge Quick And Long tests

        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]//
                                                                //  [TestCase(10135)]
        [NUnit.Framework.Category("Quick")]
        public void MergeFinancialAccountingTestQuick(decimal id)
        {
            ObjectTestsBaseStatic.MergeTest(_objType, id);
        }
        [Test, TestCaseSource("GetAllFinancialAccountingSxema")]// [TestCase(13)
        [NUnit.Framework.Category("Long")]
        public void MergeFinancialAccountingTest(decimal id)
        {
            ObjectTestsBaseStatic.MergeTest(_objType, id);
        }
        #endregion

        #region Загрузка фрагмента который не правильно  сериализуется
        private string xml =
    "<RFinancialAccountingSxema><AssignmentTemplateCollection /><AccountDefinitionCollection ><RAccountDefinition >" +
    "<Comment > Транзитный счет для кредитования клиентов2</Comment><Name>Транзит2</Name><Formula>4:5:0.-1.~GGG2</Formula>" +
    "</RAccountDefinition></AccountDefinitionCollection>" +
    "<TypicalWireCollection/>\r\n\t<AnalyticalSignCollection/>\r\n\t<SummCollection/>\r\n\t<CardDetailTemplateCollection/>\r\n\t<ValidationRulesCollection/>" +
    "\r\n\t<CourseRateCriteriaDefinitionCollection/>\r\n\t<CurrencyReestrTemplateCollection/>\r\n\t<TaxAccountingDetailTemplateCollection />" +
    "<ID>11</ID></RFinancialAccountingSxema>";

        [TestCase, NUnit.Framework.Category("Falling")]
        public void XmlLoadFinancialAccountingTest()
        {

            XmlDocument xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(xml);

            RObject newObject = BusinessFactory.RBusinessObjectFactory.Current.CreateObject(_objType) as RObject;
            //  newObject.New = true;
            newObject.LoadFromXML(xmlDocument.FirstChild);
            XmlDocument xmlDocument2 = new XmlDocument();
            XmlNode root2 = xmlDocument2.CreateElement("root");
            newObject.AppendToXML(root2);
            Assert.AreEqual(xmlDocument.FirstChild.OuterXml, root2.FirstChild.OuterXml);
        }

        #endregion

        #region сохранение объекта с изменением идентификатора

        private static long _notTypOpDocID = -1;
        /// <summary>
        /// Идентификатор учетного документа
        /// </summary>
        private static long NotTypOpDocID
        {
            get
            {
                if (_notTypOpDocID == -1)
                {
                    _notTypOpDocID = SqlHelper.ExecuteSelectSimpleLong("select T61fhtp from T61 where nvl(t61obtp,0) not in (952) and T61fhtp>10000  and rownum=1");
                }
                return _notTypOpDocID;
            }
        }

        //[Test, TestCaseSource("GetOneFinancialAccountingSxema"), Category("Quick")]
        public void XmlTestFinansialWithOtherID(decimal id, bool otherOpDocIDType)
        {
            string otherID;
            if (otherOpDocIDType)
            {
                otherID = NotTypOpDocID.ToString();  // id другого типа    
            }
            else
            {
                otherID = SqlHelper.ExecuteSelectSimpleLong("select T61fhtp from T61 where t61obtp  in (952)  and T61FHTP<>:ID and T61fhtp>10000 ", new NamedValue(id, "ID")).ToString();
            }
            var operationDocument = RBusinessObjectFactory.Current.CreateObject(id, TestedType) as RObject;
            XmlDocument doc = new XmlDocument(); doc.LoadXml("<root/>");
            operationDocument.AppendXmlWrapper(doc.DocumentElement);

            XmlNode obj = doc.DocumentElement.FirstChild.SelectSingleNode("//Object");

            obj.SetOrCreateAttr("Guid", "бла бла бла");//присвоил другой гуid
            obj.Attributes["ID"].Value = otherID;//присвоил идентификатор существующего объекта другого типа

            obj.FirstChild.SetText("ID", otherID);
            TestedObjectXml = obj.FirstChild.OuterXml;
            obj = doc.DocumentElement.FirstChild.SelectSingleNode("//UsedObjects/ObjectRef");

            obj.SetOrCreateAttr("Guid", "бла бла бла");
            obj.Attributes["ID"].Value = otherID;

            RLoadedItem la = new RLoadedItem(doc.DocumentElement.FirstChild);
            var pr = REnvironment.Current.SaveProviderPool.GetProvider();
            try
            {
                pr.BeginTransaction(TestHelper.GetSS(), TransactionOptions.NoValidate);
                la.SaveObject(pr);
                // if (reload)
                {
                    ObjectFromXml = BusinessFactory.RBusinessObjectFactory.Current.CreateObject(la.ItemObject.ID, TestedType) as RObject;//загрузил новый объект 
                    var collectionOld = (ObjectFromXml as RFinancialAccountingSxema).SummCollection;
                }
                //  if (compareXml)
                {

                    XmlDocument xmlDocument2 = ObjectFromXml.GetXml();//получили xml загруженного объекта

                    XmlObjectFromXml = xmlDocument2.OuterXml;
                    if (CutDifferenceRegex != null)//если определена регулиюха вырезающая разницу то применили ее к обоим объектам
                    {
                        XmlObjectFromXml = CutDifferenceRegex.Replace(XmlObjectFromXml, String.Empty);
                        TestedObjectXml = CutDifferenceRegex.Replace(TestedObjectXml, String.Empty);
                    }
                    if (false) //при отладки для просмотра разницы с помощью WinMerge  закометарить эту строку  
                    {
                        if (TestedObjectXml != XmlObjectFromXml)
                        {
                            CompareObjectExt.ShowXmlDifference(XmlObjectFromXml, TestedObjectXml); //просмотр разницы с помощью WinMerge
                        }
                    }
                    Assert.AreEqual(TestedObjectXml, XmlObjectFromXml);
                }

            }
            finally
            {
                pr.Rollback();
            }
            Assert.AreEqual(LoadResult.LoadOk, la.Result, la.ThisProtocol);
        }

        //  [Test, TestCaseSource("GetOneFinancialAccountingSxema"), NUnit.Framework.Category("Falling")]//падение вызывает больше вопросов 
        // [TestCase(152)]
        public void XmlTestFinansialWithExistIdOtherType(decimal id)
        {
            XmlTestFinansialWithOtherID(id, true);

        }


        //  [Test, TestCaseSource("GetAllFinancialAccountingSxemaNotStandart"), NUnit.Framework.Category("Long")]
        public void XmlTestWithChangeIdLong(decimal id)
        {
            XmlTestFinansialWithExistIdOtherType(id);
        }
        //   [Test, TestCaseSource("GetOneFinancialAccountingSxema"), NUnit.Framework.Category("Quick")]
        //  [TestCase(10052)]
        public void XmlTestFinansialWithExistIdSameType(decimal id)
        {
            XmlTestFinansialWithOtherID(id, false);

        }


        // [Test, TestCaseSource("GetAllFinancialAccountingSxemaNotStandart"), NUnit.Framework.Category("Long")]
        public void XmlTestFinansialWithExistIdSameTypeLong(decimal id)
        {
            XmlTestFinansialWithExistIdSameType(id);
        }

        #endregion

        #region Проверка  одного аналитического признака
        /// <summary>
        /// загрузка фрагмента который падает
        /// </summary>
        /// <param name="objectId"></param>
        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]// [TestCase(13)
                                                                // [Category("Quick")]
        public void XmlLoadTypicalAnalyticalSignTest(decimal objectId)
        {

            var fin = BusinessFactory.RBusinessObjectFactory.Current.CreateObject(objectId, _objType) as RFinancialAccountingSxema;
            var anSign = fin.AnalyticalSignCollection[0];
            XmlDocument xmlDocument = new XmlDocument();
            XmlNode root = xmlDocument.CreateElement("root");
            anSign.AppendToXML(root);
            var anSignLoaded = fin.CreateRTypicalAnalyticalSignFromXML(root.FirstChild);
            anSignLoaded.LoadFromXML(root.FirstChild);
            Assert.That(anSignLoaded.Name == anSign.Name);
            var provo = REnvironment.Current.SaveProviderPool.GetProvider() as IRSaveProviderInternal;
            try
            {
                provo.BeginTransaction(TestHelper.GetSS(), TransactionOptions.NoValidate);
                anSignLoaded.Save(provo);

            }
            finally
            {

                provo.Rollback();
            };

        }

        #endregion

        #region Проверка  Summ признака
        /// <summary>
        /// Сравнение суммы
        /// </summary>
        /// <param name="objectId"></param>
        [TestCase(10031)]// [TestCase(13)
                         // [Category("Quick")]
        public void SummTest(decimal objectId)
        {

            var fin = RBusinessObjectFactory.Current.CreateObject(objectId, _objType) as RFinancialAccountingSxema;

            foreach (var finSumm in fin.SummCollection)
            {

                XmlDocument xmlDocument = new XmlDocument();
                XmlNode root = xmlDocument.CreateElement("root");
                finSumm.AppendToXML(root);
                var summOld = new RFinSummOld(fin);
                summOld.LoadFromXML(root.FirstChild);

                var dif = finSumm.Compare(summOld);
                Assert.That(dif.AreEqual, finSumm.Comment);
                var provo = REnvironment.Current.SaveProviderPool.GetProvider() as IRSaveProviderInternal;
                try
                {
                    provo.BeginTransaction(TestHelper.GetSS(), TransactionOptions.NoValidate);
                    summOld.Save(provo);

                }
                finally
                {
                    provo.Rollback();
                };

            }
        }

        #endregion

        #region Проверка  CurrencyReestrTemplate
        /// <summary>
        /// Сравнение суммы
        /// </summary>
        /// <param name="objectId"></param>
        [TestCase(42)]
        [TestCase(34)]
        // [Category("Quick")]
        public void CurrencyReestrTemplateCollectionTest(decimal objectId)
        {

            var fin = RBusinessObjectFactory.Current.CreateObject(objectId, _objType) as RFinancialAccountingSxema;
            int x = 0;
            foreach (var reestr in fin.CurrencyReestrTemplateCollection)
            {

                //     XmlDocument xmlDocument = new XmlDocument();
                //      XmlNode root = xmlDocument.CreateElement("root");
                var xmlNode = reestr.AppendToXML(null);
                ;
                var reestrXml = new RCurrencyReestrTemplate(fin);
                reestrXml.LoadFromXML(xmlNode);


                var provo = REnvironment.Current.SaveProviderPool.GetProvider() as IRSaveProviderInternal;
                try
                {
                    provo.BeginTransaction(TestHelper.GetSS(), TransactionOptions.NoValidate);
                    reestr.Delete(provo);//удаляю реестр полученный из базы что бы не было констрейна
                    reestrXml.Save(provo);//сохраняю реестр хмл
                    RCurrencyReestrTemplate template = null;

                    #region чтение шаблона по номеру
                    RCurrencyReestrTemplatesLoadService service = new RCurrencyReestrTemplatesLoadService(objectId);
                    using (IRDataReader reader = service.GetDataReader(provo))
                    {
                        int y = 0;
                        // Сформировать коллекцию шаблонов
                        while (reader.Read())
                        {
                            if (x == y)
                            {
                                template = new RCurrencyReestrTemplate(fin);
                                template.Load(reader);
                            }
                            y++;
                        }
                    }
                    #endregion

                    var dif = reestr.Compare(template);
                    Assert.That(dif.AreEqual, reestr.IncomeSummaName + dif.Differense);
                    var xmlNode2 = template.AppendToXML(null);
                    if (xmlNode2.OuterXml != xmlNode.OuterXml)
                    {
                        CompareObjectExt.ShowXmlDifference(XmlObjectFromXml, TestedObjectXml); //просмотр разницы с помощью WinMerge

                    }
                }
                finally
                {
                    provo.Rollback();
                }
                x++;
            }
        }

        #endregion

        #region Validate 

        [NUnit.Framework.Category("Quick")]
        [Test]
        // [TestCase(false)]
        public void FinancialAccountingTestValidate()
        {

            RTypicalOperationDocument operationDocument = new RTypicalOperationDocument();
            operationDocument.ID = SqlHelper.ExecuteSelectSimpleLong("Select T61FHTP from T61 where NVL(T61OBTP,952) IN (952) and rownum=1");
            operationDocument.New = true;

            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(operationDocument, ObjectUsingMode.View, true);
            financialAccountingSxema.SetSubItem("IsLoadedFromXml", true, BindingFlags.NonPublic | BindingFlags.Instance);
            // var errors = financialAccountingSxema.Validate();

            operationDocument.ID = operationDocument.GetNextID(true);//Присвоили  несуществующий идентификатор
            // Assert.That(errors.ContainsOnlyWarnings);
            financialAccountingSxema = new RFinancialAccountingSxema(operationDocument, ObjectUsingMode.View, true);
            financialAccountingSxema.SetSubItem("IsLoadedFromXml", true, BindingFlags.NonPublic | BindingFlags.Instance);
            var errors2 = financialAccountingSxema.Validate();//ошибок должно быть на одну больше

            bool ok = false;
            foreach (var error in errors2)
            {
                ok = error.Text.Contains("Отсутствует типовой операционный документ");
            }

            Assert.AreEqual(true, ok);
        }

        #endregion

        [NUnit.Framework.Category("Quick")]
        [TestCase(true)]
        [TestCase(false)]
        public void FinancialAnalyticalSignValidate(bool existOperationDocument)
        {
            var xml = LoadResources.GetXmlFromResource("test 10456.FinancialAccountingSxemaXML");
            var financialAccountingSxema = new RFinancialAccountingSxema();
            financialAccountingSxema.LoadFromXML(xml.FirstChild.FirstChild.FirstChild);

            IErrorCollection errorCollection = new RErrorCollection();
            foreach (var anSign in financialAccountingSxema.AnalyticalSignCollection)
            {
                if (anSign is RTypicalAnalyticalSignAsExpression)
                {
                    var errorsa = anSign.Validate();
                    if (errorsa.Count > 0)
                    {
                        errorCollection.AddRange(errorsa);
                    }
                }
            }
            Assert.That(errorCollection.ContainsOnlyWarnings);
            Assert.AreEqual(5, errorCollection.Count);
        }

        #region Validate  Criteria

        /// <summary>
        /// проверка что все критерий фомрирования проводок разбирается корркетно
        /// </summary>
        /// <param name="id"></param>
        [NUnit.Framework.Category("Information")]
        //  [Test, TestCaseSource("GetAllFinancialAccountingSxema")]
        [TestCase(20)]
        public void WireFormulaTest(decimal id)
        {
            // if (id!=127)return;
            var typicalOperationDocument = new RTypicalOperationDocument();
            typicalOperationDocument.ID = id;
            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(typicalOperationDocument, ObjectUsingMode.Edit, true);
            StringBuilder errors = new StringBuilder();
            int i = 0;
            foreach (RTypicalWire wire in financialAccountingSxema.TypicalWireCollection)
            {
                i++;
                // if(i==3 && id==10037)continue; 
                //--if(i!=3 )continue; 
                Debug.WriteLine(i + ")=====================================Анализируется шаблон проводки " + wire.Comment + "--" + wire.Criteria);
                try
                {
                    // var error =   wire.Validate();

                    var eee = (wire as IDataErrorInfo)["Criteria"];

                    var err = wire.CheckValue("Criteria");
                    foreach (var e in err)
                    {
                        // if (!e.Text.Contains("FF.SUM")) continue;//надо разобраться отдельно
                        if (e.Text.Contains("не входит в список допустимых значений переменной")) continue;//ошибка настройки схемы разложения

                        // if (e.Text.Contains("FF.ISFIXED()")) continue;//надо разобраться отдельно
                        // if (e.Text.Contains("Несоответствие типа  2-го аргумента")) continue;//надо разобраться отдельно
                        errors.AppendLine(e.Text);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("ошибка в разборе шаблона " + wire.Comment + "--" + wire.Criteria, ex);
                }
            }
            Assert.That(errors.Length == 0, errors.ToString());
        }



        /// <summary>
        /// проверка что все критерий фомрирования проводок разбирается корркетно
        /// </summary>
        /// <param name="id"></param>
        [NUnit.Framework.Category("Information")]
        [Test, TestCaseSource("GetAllFinancialAccountingSxema")]
        // [TestCase(129)]
        public void AccountFormulaTest(decimal id)
        {
            // if (id!=127)return;
            var typicalOperationDocument = new RTypicalOperationDocument();
            typicalOperationDocument.ID = id;
            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(typicalOperationDocument, ObjectUsingMode.Edit, true);
            StringBuilder errors = new StringBuilder();
            int i = 0;
            foreach (RAccountDefinition accountDefinition in financialAccountingSxema.AccountDefinitionCollection)
            {
                i++;
                // if(i==3 && id==10037)continue; 
                //--if(i!=3 )continue; 
                Debug.WriteLine(i + ")======Анализируется определение счета " + accountDefinition.Name + "--" + accountDefinition.Comment);
                foreach (var definitionMethod in accountDefinition.AccountDefinitionMethodCollection)
                {

                    try
                    {


                        var err = definitionMethod.CheckValue("Criteria");
                        foreach (var e in err)
                        {
                            if (e.Text.Contains("не входит в список допустимых значений переменной")) continue;//ошибка настройки схемы разложения
                            errors.AppendLine(e.Text);
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(
                            "ошибка в разборе шаблона " + accountDefinition.Name + "--" + accountDefinition.Comment,
                            ex);
                    }
                }
            }
            Assert.That(errors.Length == 0, errors.ToString());
        }




        /// <summary>
        /// проверка что схема разложения возвращает список групповых имен счетов в ней используемых
        /// </summary>
        /// <param name="id"></param>
        [NUnit.Framework.Category("Information")]
        // [Test, TestCaseSource("GetAllFinancialAccountingSxema")]
        [TestCase(10207)]
        public void AccountShemaHasGroupNamesValidateTest(decimal id)
        {
            var typicalOperationDocument = new RTypicalOperationDocument();
            typicalOperationDocument.ID = id;
            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(typicalOperationDocument, ObjectUsingMode.Edit, true);
            RAccountDefinition accountDefinition = financialAccountingSxema.AccountDefinitionCollection.FirstOrDefault();//получили первое определение счета
            var definitionMethod = accountDefinition.AccountDefinitionMethodCollection.FirstOrDefault();//получили первый метод

            definitionMethod.ExecuteMethod("Parse", new[] { "3:3:209.131" });


            var err = financialAccountingSxema.Validate();//получили список ошибок

            var nextId = ObjectHelper.GuidServ.GetNextId((long)RObjectStandardTypes.RAccountType, false);//получил следующий идентификатор групоового имени
            definitionMethod.TypicalAccountName = nextId.ToString();//изменили метод на новый 

            var err2 = financialAccountingSxema.Validate();//проверил что ошибок стало на одну больше
            Assert.That(err.Count == err2.Count - 1);
        }


        /// <summary>
        /// проверка что ошибки схемы разложения попадают в типовой операционный документ
        /// </summary>
        /// <param name="id"></param>
        [NUnit.Framework.Category("Information")]
        // [Test, TestCaseSource("GetAllFinancialAccountingSxema")]
        [TestCase(10207)]
        public void TypicalOperationDocumentValidateTest(decimal id)
        {
            var typicalOperationDocument = new RTypicalOperationDocument();
            typicalOperationDocument.ID = id;
            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(typicalOperationDocument, ObjectUsingMode.Edit, true);
            typicalOperationDocument.FinancialAccountingSxema = financialAccountingSxema;
            RAccountDefinition accountDefinition = financialAccountingSxema.AccountDefinitionCollection.FirstOrDefault();//получили первое определение счета
            var definitionMethod = accountDefinition.AccountDefinitionMethodCollection.FirstOrDefault();//получили первый метод

            definitionMethod.ExecuteMethod("Parse", new[] { "3:3:209.131" });


            var err = typicalOperationDocument.Validate();//получили список ошибок

            var nextId = ObjectHelper.GuidServ.GetNextId((long)RObjectStandardTypes.RAccountType, false);//получил следующий идентификатор групоового имени
            definitionMethod.TypicalAccountName = nextId.ToString();//изменили метод на новый 

            var err2 = typicalOperationDocument.Validate();//проверил что ошибок стало на одну больше
            Assert.That(err.Count == err2.Count - 1);
        }


        /// <summary>
        /// проверка что схема разложения возвращает список групповых имен счетов в ней используемых
        /// </summary>
        /// <param name="id"></param>
        [NUnit.Framework.Category("Information")]
        // [Test, TestCaseSource("GetAllFinancialAccountingSxema")]
        [TestCase(10207)]
        public void AccountShemaGetUsedObjects(decimal id)
        {
            var typicalOperationDocument = new RTypicalOperationDocument();
            typicalOperationDocument.ID = id;
            RFinancialAccountingSxema financialAccountingSxema = new RFinancialAccountingSxema(typicalOperationDocument, ObjectUsingMode.Edit, true);
            RAccountDefinition accountDefinition = financialAccountingSxema.AccountDefinitionCollection.FirstOrDefault();//получили первое определение счета
            var definitionMethod = accountDefinition.AccountDefinitionMethodCollection.FirstOrDefault();//получили первый метод

            definitionMethod.ExecuteMethod("Parse", new[] { "3:3:209.131" });

            var usedObjects = financialAccountingSxema.GetReferencesOnUsedObjects();
            bool ok = false;
            foreach (var obj in usedObjects)
            {
                if (obj.ID == 209 && obj.TypeID == (long)RObjectStandardTypes.RAccountType)
                {
                    ok = true; break;
                }
            }
            Assert.That(ok);
        }

        #endregion

        #region получение идентификаторов существующих объектов

        public static List<TestCaseData> GetOneFinancialAccountingSxema()
        {

            var ret = new List<TestCaseData>();
            var allObjects = MetaDataObjectService.GetAllObjects((long)RObjectStandardTypes.TypicalOperationDocument, 1, "T61FHTP>10000");

            foreach (CutObject obj in allObjects)
            {

                var tc = new TestCaseData(obj.ID);
                tc.TestName = "Cхема разложения " + obj.Name + " id=" + obj.ID;
                ret.Add(tc);

            }
            return ret;
        }

        static List<TestCaseData> _allFinancialAccounting;
        public static List<TestCaseData> GetAllFinancialAccountingSxema()
        {

            if (_allFinancialAccounting == null)
            {
                _allFinancialAccounting = new List<TestCaseData>();

                var allObjects = MetaDataObjectService.GetAllObjects((long)RObjectStandardTypes.TypicalOperationDocument, 10000, "T61FHTP>0 and t61cash>=0 ");//если t61cash =1- возникает ошибка
                int i = 0;
                foreach (CutObject obj in allObjects)
                {

                    var tc = new TestCaseData(obj.ID);
                    tc.TestName = "Cхема разложения " + obj.Name + " id=" + obj.ID;
                    _allFinancialAccounting.Add(tc);

                }
            }
            return _allFinancialAccounting;
        }


        private static List<TestCaseData> _allFinancialAccountingNotStandard;
        public static List<TestCaseData> GetAllFinancialAccountingSxemaNotStandart()
        {
            if (_allFinancialAccountingNotStandard == null)
            {
                _allFinancialAccountingNotStandard = new List<TestCaseData>();
                foreach (var fin in GetAllFinancialAccountingSxema())
                {
                    if (Convert.ToInt32(fin.Arguments[0]) > 10000)
                    {
                        _allFinancialAccountingNotStandard.Add(fin);
                    }
                }
            }
            return _allFinancialAccountingNotStandard;
        }

        #endregion
    }


    /// <summary>
    /// Набор тестов объекта внебалансовая схема разложения
    /// </summary>
    [TestFixture]
    public class NonBalanceFinancialAccountingSxemaTests : ObjectTestsBase
    {
        #region  Тестируемый тип FinancialAccountingSxema

        private static long _objType = (long)RObjectStandardTypes.FinancialAccountingSxemaNoBalanse;
        /// <summary>
        /// Тестируемый тип
        /// </summary>
        public override long TestedType
        {
            get { return _objType; }
        }

        #endregion

        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]
        public void GetConflictsTest(decimal id)
        {
            TestedObject = RBusinessObjectFactory.Current.CreateObject(id, TestedType) as RFinancialAccountingSxema;
            var conf = TestedObject.GetConflicts();
        }


        #region  Xml Quick And Long tests

        [NUnit.Framework.Category("Quick")]
        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]
        public void XmlFinancialAccountingQuickTest(decimal id)
        {
            base.XmlTestFull(TestedType, id, false, true);
            var f = base.TestedObject as RFinancialAccountingSxema;
            var fx = base.TestedObject as RFinancialAccountingSxema;

            // Список шаблонов назначений
            //  Assert.AreEqual(f.AssignmentTemplateCollection.Count, fx.AssignmentTemplateCollection.Count);
            // Список аналитических признаков
            Assert.AreEqual(f.AnalyticalSignCollection.Count, fx.AnalyticalSignCollection.Count);

            // Коллекция счетов схемы разложения
            Assert.AreEqual(f.AccountDefinitionCollection.Count, fx.AccountDefinitionCollection.Count);

            // Коллекция сумм
            Assert.AreEqual(f.SummCollection.Count, fx.SummCollection.Count);

            // Коллекция проводок схемы разложения

            Assert.AreEqual(f.TypicalWireCollection.Count, fx.TypicalWireCollection.Count);

            // Коллекция шаблонов для выписки по карте
            Assert.AreEqual(f.CardDetailTemplateCollection.Count, fx.CardDetailTemplateCollection.Count);

            // Коллекция критериев корретности операционного документа
            Assert.AreEqual(f.ValidationRulesCollection.Count, fx.ValidationRulesCollection.Count);

            // Коллекция критериев определения групп курсовых ставок
            Assert.AreEqual(f.CourseRateCriteriaDefinitionCollection.Count, fx.CourseRateCriteriaDefinitionCollection.Count);

            // Коллекция шаблонов для реестра валютных операций
            Assert.AreEqual(f.CurrencyReestrTemplateCollection.Count, fx.CurrencyReestrTemplateCollection.Count);

            // Коллекция шаблонов для налогового учета
            Assert.AreEqual(f.TaxAccountingDetailTemplateCollection.Count, fx.TaxAccountingDetailTemplateCollection.Count);

        }




        [Test, TestCaseSource("GetAllFinancialAccountingSxema"), NUnit.Framework.Category("Long")]
        public void XmlFinancialAccountingTest(decimal id)
        {
            XmlFinancialAccountingQuickTest(id);
        }

        #endregion

        #region Merge Quick And Long tests

        [Test, TestCaseSource("GetOneFinancialAccountingSxema")]// [TestCase(13)
        [NUnit.Framework.Category("Quick")]
        public void MergeFinancialAccountingTestQuick(decimal id)
        {
            ObjectTestsBaseStatic.MergeTest(_objType, id);
        }
        [Test, TestCaseSource("GetAllFinancialAccountingSxema")]// [TestCase(13)
        [NUnit.Framework.Category("Long")]
        public void MergeFinancialAccountingTest(decimal id)
        {
            ObjectTestsBaseStatic.MergeTest(_objType, id);
        }
        #endregion

        public static List<TestCaseData> GetOneFinancialAccountingSxema()
        {

            var ret = new List<TestCaseData>();
            var allObjects = MetaDataObjectService.GetAllObjects((long)RObjectStandardTypes.TypicalOperationDocument, 1, "T61FHTP>0");

            foreach (CutObject obj in allObjects)
            {

                var tc = new TestCaseData(obj.ID);
                tc.TestName = "Cхема разложения " + obj.Name + " id=" + obj.ID;
                ret.Add(tc);

            }
            return ret;
        }
        public static List<TestCaseData> GetAllFinancialAccountingSxema()
        {

            var ret = new List<TestCaseData>();
            var allObjects = MetaDataObjectService.GetAllObjects((long)RObjectStandardTypes.TypicalOperationDocument, 10000, "T61FHTP>0");
            int i = 0;
            foreach (CutObject obj in allObjects)
            {

                var tc = new TestCaseData(obj.ID);
                tc.TestName = "Cхема разложения " + obj.Name + " id=" + obj.ID;
                ret.Add(tc);

            }
            return ret;
        }

    }
}
